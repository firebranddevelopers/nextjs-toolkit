import resolveAncestry from "../../common/resolveAncestry"
import { ProjectState } from "../../../types"

const createGetQueryForType =
  ({ cacheManifest: { queryManifest, typeAncestry } }: ProjectState) =>
  (type: string): string | null => {
    // @ts-ignore
    const ancestors = typeAncestry[type] ?? []
    const queriesKey = resolveAncestry(
      type,
      ancestors,
      Object.keys(queryManifest)
    )
    // @ts-ignore
    return queriesKey ? queryManifest[queriesKey]?.source ?? null : null
  }

export default createGetQueryForType
