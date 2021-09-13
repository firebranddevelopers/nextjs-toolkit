import React from "react"
import { NextRouter, useRouter } from "next/router"
import createNavigationUtils from "./utils"
import { PageInterface } from "./utils"
import linkify from "../utils/linkify"


export interface NavState<T> {
    current: boolean
    linkingMode: "current" | "section" | "link"
    level: number
    first: boolean
    last: boolean
    even: boolean
    odd: boolean
    pos: number
    key: number | string
    hasChildren: boolean
    children: Array<T>
}

interface Props<T extends PageInterface> {
    router: NextRouter
    items: Array<T>
    children: (child: T, state: NavState<T>) => React.ReactNode
}

const Navigation = <T extends PageInterface>({ router, items, children }: Props<T>): React.ReactElement => {
    const { asPath } = router
    const { isSection, hasChildren, getChildren } = createNavigationUtils<T>()
    const navItems = items.map((page, i) => {
        page.link = linkify(page.link)
        const current = page.link === asPath
        const section = isSection(page, asPath)
        const pos = i + 1
        const state: NavState<T> = {
            current, 
            linkingMode: current ? `current` : (section ? `section` : `link`),
            pos: pos + 1,
            even: pos % 2 === 0,
            odd: pos % 2 === 1,
            first: pos === 1,
            last: pos === items.length,
            // todo: not a great heuristic. Maybe get this from the API
            level: page.link.split(`/`).length,
            key: page.id,
            hasChildren: hasChildren(page),
            children: getChildren(page),
        }
        return children(page, state)
    })
    return <>{navItems}</>
}

export default Navigation