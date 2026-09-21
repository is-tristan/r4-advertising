import { createImageUrlBuilder } from "@sanity/image-url"

import { dataset, projectId } from "@/sanity/env"

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source) {
  return builder.image(source)
}

export const sanityImagePresets = {
  newsCard: {
    width: 1536,
    aspectRatio: 4 / 3,
  },
  newsBanner: {
    width: 1920,
    aspectRatio: 4 / 3,
  },
  authorAvatar: {
    width: 160,
    aspectRatio: 1,
  },
  teamCard: {
    width: 1024,
    aspectRatio: 1,
  },
  careerCard: {
    width: 1024,
    aspectRatio: 16 / 9,
  },
  workGrid: {
    width: 1536,
    aspectRatio: 1,
  },
  workGallery: {
    width: 1920,
    aspectRatio: 16 / 9,
  },
  videoPoster: {
    width: 1920,
    aspectRatio: 16 / 9,
  },
  contentVideoPoster: {
    width: 1280,
    aspectRatio: 16 / 9,
  },
  openGraph: {
    width: 1200,
    aspectRatio: 1200 / 630,
  },
}

export function getSanityImageUrl(source, preset) {
  if (!source) {
    return null
  }

  if (typeof source === "string") {
    return source
  }

  if (!source.asset) {
    return null
  }

  const config = sanityImagePresets[preset]

  if (!config) {
    return urlFor(source).auto("format").url()
  }

  const height = Math.round(config.width / config.aspectRatio)

  return urlFor(source)
    .width(config.width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url()
}
