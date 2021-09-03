//import { PageInterface } from "../../graphql"
//import { PageUnion } from "../../types"
import { isLevel, hasChildren, inSection, getChildren, getPeers } from "./utils"

type PageUnion = {
    title: string
    menuTitle: string
    id: string
    link: string
    navParent: PageUnion
    navChildren: {
        nodes: Array<PageUnion>
    }
}
type PageInterface = {
    title: string
    menuTitle: string
    id: string
    link: string
    navParent: PageInterface
    navChildren: {
        nodes: Array<PageInterface>
    }
}

export interface NavigationTools {
    isLevel: (level: number) => boolean
    hasChildren: () => boolean
    getChildren: () => Array<PageUnion>
    inSection: (section: string) => boolean
    getPeers:() => Array<PageUnion>
}

const useNavigationState = <T extends PageInterface>(page: T): NavigationTools => {

    return {
        isLevel(level: number) {
            return isLevel(page, level)
        },
        hasChildren() {
            return hasChildren(page)
        },
        getChildren() {
            return getChildren(page)
        },
        inSection(section: string) {
            return inSection(page, section)
        },
        getPeers() {
            return getPeers(page)
        }
    }
}

export default useNavigationState