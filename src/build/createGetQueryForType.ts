import { resolveAncestry } from "./resolveAncestry"
import {  ProjectState } from "../../types"

const createGetQueryForType = ({ cacheManifest }: ProjectState) => (type: string): string | null => {
    const {queryManifest, typeAncestryManifest} = cacheManifest
    // @ts-ignore
    const ancestors = typeAncestryManifest[type] ?? []
    const queriesKey = resolveAncestry(type, ancestors, Object.keys(queryManifest))
    // @ts-ignore
    return queriesKey ? (QUERIES[queriesKey]?.source ?? null) : null
}

export default createGetQueryForType
