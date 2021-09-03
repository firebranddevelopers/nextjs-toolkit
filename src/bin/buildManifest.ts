import cache from "../cache/cache"
import dotenv from 'dotenv';
import { ProjectConfig } from "../../types";

const ssConfig: ProjectConfig = require(`${process.cwd()}/ssConfig`).default

dotenv.config()
cache.clear()

const preBuildSteps = (ssConfig.prebuild ?? [])
const promises = preBuildSteps.map(func => func(ssConfig))
Promise.all(promises)
    .then(() => {
        console.log(`Prebuild complete`)
    })


