import { glob } from "glob"
import { basename } from "path"
import cache from "../cache/cache"

export default async (): Promise<void> => {
    const output = [
        `/** GENERTATED CODE -- DO NOT MODIFY **/`,
        ``,
        `module.exports = {`
    ]        
    
    const cacheFiles = glob.sync(`${cache.dir()}/*.js`)
    cacheFiles.forEach(absPath => {
        const base = basename(absPath)
        const canonicalName = base.match(/^\.([A-Za-z_-]+)/)
        if (canonicalName) {
            output.push(`\t${canonicalName}: require("./${base}"),`)
        }
    })

    output.push(`}`)
    cache.writeFile(`.__cacheManifest.js`,output.join("\n"))

    return Promise.resolve()
}
