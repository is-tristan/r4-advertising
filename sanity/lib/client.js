import { createClient } from "next-sanity"

import { apiVersion, assertEnv, dataset, projectId } from "@/sanity/env"

assertEnv()

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const fetchContent = sanityClient.fetch.bind(sanityClient)

sanityClient.fetch = (query, params = {}, options = {}) => {
  return fetchContent(query, params, {
    ...options,
    next: {
      ...options.next,
      revalidate: 30,
    },
  })
}

export const client = sanityClient
