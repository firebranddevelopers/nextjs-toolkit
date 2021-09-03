import cache from "../cache/cache"
import { ProjectConfig } from "../../types"
import createClient from "../graphql/createClient"

export default async (ssConfig: ProjectConfig): Promise<void> => {
    const api = createClient(ssConfig)
    const BUILD_QUERY = `
    query StaticBuild {
        staticBuild {
            typeAncestry {
                type
                ancestry
            }
        }

    }
    `
    return api.query(BUILD_QUERY)
        .then(({ staticBuild: { typeAncestry } }) => {
            const ancestryMap: { [key: string]: Array<string> } = {}
            typeAncestry.forEach((result: { type: string, ancestry: Array<string> }) => {
                ancestryMap[result.type] = result.ancestry
            })  
            cache.writeFile(`.typeAncestry.json`, JSON.stringify(ancestryMap))

        })
}
