"use client"

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

import { apiVersion, dataset, projectId } from "./sanity/env"
import { schemaTypes } from "./sanity/schemaTypes"
import { structure } from "./sanity/structure"

export default defineConfig({
  name: "r4-advertising",
  title: "R4 Advertising",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
})
