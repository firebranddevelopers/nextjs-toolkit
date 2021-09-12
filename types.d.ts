import React from "react"

export type StringMap = {
    [key: string]: string
}


export interface ClientConfig {
    endpoint: string
    options: {
        [key: string]: string | StringMap
        headers: StringMap
    }
  }
  
export interface ProjectConfig {
      elemental: {
        enabled: boolean,
        fragmentsPath: string
        componentsPath: string,
      }
  
      query: {
        pluraliser: (s: string) => string,
      }
  
      page: {
        ignore: Array<string>
      }
      
      baseDir : string
      
      baseURL: string
      
      client: () => ClientConfig
}

export interface CacheManifest {
  templateManifest: TemplateManifest
  getPropsManifest: GetPropsManifest
  typeAncestry: TypeAncestryManifest
  queryManifest: QueryManifest
}

export interface ProjectState {
    cacheManifest: CacheManifest
    projectConfig: ProjectConfig
}
