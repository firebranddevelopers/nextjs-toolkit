import React from "react"
import resolveAncestry from "../utils/resolveAncestry"
import { initProject, requireProject } from "../utils/project"
import { ProjectState } from "../../types"

interface Props {
    data: {
        [key: string]: unknown
    }
    type: string
    templates: Array<string>
}

const Page = (project: ProjectState) => {
    initProject(project)
    return ({ data, type, templates }: Props): JSX.Element => {
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
}

export default Page
