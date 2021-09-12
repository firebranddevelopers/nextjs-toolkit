import linkify from "../utils/linkify"

type Linkable = { link: string }

interface Connection<T> {
  nodes: Array<T>
}

export interface PageInterface {
  id: string
  title?: string | null
  link: string
  navChildren: Connection<this>
  navParent?: this | null
}

interface NavUtils<T extends PageInterface> {
  getLevel<T extends Linkable>(page: T): number
  isLevel<T extends Linkable>(page: T, level: number): boolean
  getChildren(page: T): Array<T>
  getPeers(page: T): Array<T>
  hasChildren(page: T): boolean
  inSection<T extends Linkable>(page: T, section: string): boolean
  isSection<T extends Linkable>(page: T, section: string): boolean
}

function createNavigationUtils<T extends PageInterface>(): NavUtils<T> {
  const getLevel = <T extends Linkable>(page: T) => {
    if (!page.link) {
      return 0
    }
    return page.link.split(`/`).length
  }

  const isLevel = <T extends Linkable>(page: T, level: number) => {
    return getLevel(page) >= level
  }

  const getChildren = (page: T) => {
    const children = page.navChildren?.nodes ?? []
    return children.map(child => ({
      ...child,
      link: linkify(child.link),
    }))
  }

  const getPeers = (page: T) => {
    return page.navParent?.navChildren?.nodes ?? []
  }

  const hasChildren = (page: T) => {
    return getChildren(page).length > 0
  }

  const inSection = <T extends Linkable>(page: T, section: string) => {
    return page.link.startsWith(`${section}/`)
  }

  const isSection = <T extends Linkable>(page: T, section: string) => {
    return section.startsWith(`${page.link}/`)
  }

  return {
    getLevel,
    isLevel,
    getChildren,
    hasChildren,
    getPeers,
    inSection,
    isSection,
  }
}

export default createNavigationUtils
