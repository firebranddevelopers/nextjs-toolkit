#!/usr/bin/env node

import dotenv from "dotenv"
import path from "path"
import { ProjectConfig } from "../../types"
import { transpileModule } from "typescript"
import fs from "fs"

;(async () => {
  let configFilePath;
  for (const p of module.paths) {
    const candidate = path.join(path.dirname(p), `ss.config.ts`)
    if (fs.existsSync(candidate)) {
      configFilePath = candidate
      break;
    }
  }
  if (!configFilePath) {
    throw new Error(`Could not find a ss.config.ts file in ${JSON.stringify(module.paths)}`)
  }

  const tsSource = fs.readFileSync(configFilePath, { encoding: `utf8` })
  const jsSource = transpileModule(tsSource, {
    compilerOptions: {
      esModuleInterop: true,
      skipLibCheck: true,
    }
  })
  const envPath = path.join(path.dirname(configFilePath), `.env`)
  dotenv.config({ path: envPath })

  const ssConfig: ProjectConfig = eval(jsSource.outputText)

  const commands: { [command: string]: () => Promise<any> } = {
    "build-manifest": () =>
      import("./buildManifest").then(i => i.buildManifest(ssConfig)),
    "scafffold-pages": () =>
      import("./scaffoldPages").then(i => i.scaffoldPages(ssConfig)),
    "scaffold-blocks": () =>
      import("./scaffoldBlocks").then(i => i.scaffoldBlocks(ssConfig)),
    "setup": () => import("./setup").then(i => i.setup()),
  }

  const command = commands[process.argv[2]] ?? null

  if (!command) {
    console.log(`
    Usage
      $ nextjs-toolkit <command>

    Available commands
      ${Object.keys(commands).join(", ")}

  `)
    process.exit(0)
  }

  // Make sure commands gracefully respect termination signals (e.g. from Docker)
  process.on("SIGTERM", () => process.exit(0))
  process.on("SIGINT", () => process.exit(0))

  await command()
})()
