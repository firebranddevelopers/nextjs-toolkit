#!/usr/bin/env node

import { resolve } from "path"
import { ProjectConfig } from "../../types"
import { transpileModule } from "typescript"
import fs from "fs"

;(async () => {
  const configFile =
    process.argv[2] ?? resolve(`${__dirname}../../ss.config.ts`)

  if (!fs.existsSync(configFile)) {
    throw new Error(`Config file ${configFile} does not exist`)
  }

  const tsSource = fs.readFileSync(configFile, { encoding: `utf8` })
  const jsSource = transpileModule(tsSource, {
    compilerOptions: {
      esModuleInterop: true,
      skipLibCheck: true,
    }
  })

  const parsed = eval(jsSource.outputText)
  const ssConfig: ProjectConfig = parsed.default

  const commands: { [command: string]: () => Promise<any> } = {
    "build-manifest": () =>
      import("./buildManifest").then(i => i.buildManifest(ssConfig)),
    "scafffold-pages": () =>
      import("./scaffoldPages").then(i => i.scaffoldPages(ssConfig)),
    "scaffold-blocks": () =>
      import("./scaffoldBlocks").then(i => i.scaffoldBlocks(ssConfig)),
    "setup": () => import("./setup").then(i => i.setup()),
  }

  const command = commands[process.argv[1]] ?? null

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
