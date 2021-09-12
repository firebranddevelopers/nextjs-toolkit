import { useContext } from "react"
import { StaticQueryContext } from "./StaticQueryContext"
import getCacheKey from "../utils/getCacheKey"

interface StaticQueryResult<T> {
    [key: string]: T
}
const useStaticQuery = <T>(gqlQuery: string): StaticQueryResult<T> | null => {
    const staticQueries = useContext(StaticQueryContext)
    const cacheKey = getCacheKey(gqlQuery)
    if (cacheKey) {
        const result = staticQueries![cacheKey] ?? null as StaticQueryResult<T> | null
        
        return result
    }

    return null
}


export default useStaticQuery