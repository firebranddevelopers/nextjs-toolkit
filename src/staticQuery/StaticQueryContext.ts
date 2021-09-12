import React from "react"

export interface StaticQueryContextValue {
  [key: string]: any
}

export const StaticQueryContext = React.createContext<StaticQueryContextValue | null>(null)

