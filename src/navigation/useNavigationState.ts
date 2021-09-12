import createNavigationUtils from "./utils"
import { PageInterface } from "./utils"

export interface NavigationTools<T> {
    isLevel: (level: number) => boolean
    hasChildren: () => boolean
    getChildren: () => Array<T>
    inSection: (section: string) => boolean
    getPeers:() => Array<T>
}

const useNavigationState = <T extends PageInterface>(page: T): NavigationTools<T> => {
    const { isLevel, hasChildren, inSection, getChildren, getPeers } = createNavigationUtils<T>()
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