import React from "react"
import { ProjectState } from "../../types"
import { resolveAncestry } from "../build/resolveAncestry"

interface Props {
    data: {
        [key: string]: unknown
    }
    type: string
    templates: Array<string>
}


const createPage = 
    ({ cacheManifest }: ProjectState):
    React.FC<Props> => ({ data, type, templates }: Props) => {
        // @ts-ignore
        const ancestors = cacheManifest.typeAncestry[type] ?? []
        const key = resolveAncestry(type, ancestors, templates)
        // @ts-ignore
        const Component = key ? cacheManifest.templateManifest[key] : null
        if (!Component) {
            throw new Error(`No template found for ${type} (resolved to "${key}")`);
        }

        return <Component {...data} />
}

export default createPage
