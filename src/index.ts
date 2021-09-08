export { default as getStaticProps } from './bootstrap/getStaticProps'
export { default as getStaticPaths } from './bootstrap/getStaticPaths'
export { default as Page } from './bootstrap/Page'

//export { default as cacheElementalBlocks } from './prebuild/cacheElementalBlocks'

export { default as defaultPluraliser } from './build/pluraliser'
export { default as resolveAncestry } from './build/resolveAncestry'

//export { default as cache } from './cache/cache'

export { default as HTMLElement } from './components/HTMLElement'

export { loadProject, requireProject, initProject } from "./utils/project"
export { bootProjectConfig } from "./utils"
export { default as getBaseURL } from './config/getBaseURL'
export { default as getGraphQLEndpoint } from './config/getGraphQLEndpoint'

//export { default as createClient } from './graphql/createClient'

export { default as Navigation } from './navigation/Navigation'
export { default as useNavigationState } from './navigation/useNavigationState'
import { 
    getChildren,
    getLevel,
    getPeers,
    isLevel,
    hasChildren,
    inSection,
    isSection,
    linkify
} from './navigation/utils'
export {
    getLevel,
    getChildren,
    getPeers,
    isLevel,
    hasChildren,
    inSection,
    isSection,
    linkify,
}
export { default as useStaticQuery } from './staticQuery/useStaticQuery'
export { default as usePageContext } from './pageContext/usePageContext'
export { PageContext, PageContextValue } from './pageContext/PageContext'

export { ProjectState } from "../types"