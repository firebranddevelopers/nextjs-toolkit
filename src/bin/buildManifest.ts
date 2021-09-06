#!/usr/bin/env node

import cacheStaticQueries from "../prebuild/cacheStaticQueries";
import cacheQueryManifest from "../prebuild/cacheQueryManifest";
import cacheTypeAncestry from "../prebuild/cacheTypeAncestry";
import cacheTemplateManifest from "../prebuild/cacheTemplateManifest";
import cacheGetProps from "../prebuild/cacheGetProps";

import { ProjectConfig } from "../../types";
import createCacheManifest from "../prebuild/createCacheManifest";
import { resolve } from "path"

const configFile = process.argv[2] ?? resolve(`${__dirname}../../ss.config.ts`)
const ssConfig: ProjectConfig = require(configFile).default

const preBuildSteps = [
    cacheStaticQueries,
    cacheQueryManifest,
    cacheTypeAncestry,
    cacheTemplateManifest,
    cacheGetProps,
    ...(ssConfig.prebuild ?? []),
]

const promises = preBuildSteps.map(func => func(ssConfig))
Promise.all(promises)
    .then(() => {
        createCacheManifest()
        .then(() => {
            console.log(`Prebuild complete`)
        })
        
    })
    .catch(e => {
        console.error(`
Error received while building the manifest:

${e.message}


        `)
    })


