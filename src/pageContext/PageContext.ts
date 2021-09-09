import React from "react"
//import { Query } from "../../graphql"

//export type PageContextValue = Query["readOnePage"]

export type PageContextValue = {
    title?: string | null
} | null

export const PageContext = React.createContext<PageContextValue>(null)

