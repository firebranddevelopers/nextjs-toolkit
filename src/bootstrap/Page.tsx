import React from "react"
import resolveAncestry from "../build/resolveAncestry"
import { requireProject } from "../utils/project"

interface Props {
    data: {
        [key: string]: unknown
    }
    type: string
    templates: Array<string>
}

const Page = ({ data, type, templates }: Props): JSX.Element => {
        const { typeAncestry, templateManifest } = requireProject().cacheManifest
        // @ts-ignore    
        const ancestors = typeAncestry[type] ?? []
        const key = resolveAncestry(type, ancestors, templates)
        // @ts-ignore
        const Component = key ? templateManifest[key] : null
        if (!Component) {
            throw new Error(`No template found for ${type} (resolved to "${key}")`);
        }
        // @ts-ignore
        return <Component {...data} />
}

export default Page
