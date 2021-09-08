import { ProjectState } from "../../types"

let __project: ProjectState

export const initProject = (project: ProjectState) => __project = project

export const loadProject = () => __project

export const requireProject = () => {
    if (!__project) {
        throw new Error(`Project is not set. Did you forget to call initProject()?`)
    }
    return __project
}