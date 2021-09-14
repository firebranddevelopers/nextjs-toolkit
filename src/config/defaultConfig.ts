import { ProjectConfig, ClientConfig } from "../../types"
import defaultPluraliser from "../utils/pluraliser"

const config: ProjectConfig = {
    query: {
      pluraliser: defaultPluraliser,
    },

    page: {
      ignore: [`RedirectorPage`, `ErrorPage`, `VirtualPage`]
    },

    baseURL: ``,

    baseDir: ``,
    
    client(): ClientConfig {
        return {
            endpoint: ``,
            options: {
                headers: {},
            },
        }
    }
}

export default config