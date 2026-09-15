import { createClient } from "next-sanity"

import { apiVersion, assertEnv, dataset, projectId } from "@/sanity/env"

assertEnv()

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
