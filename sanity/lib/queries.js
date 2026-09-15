import { defineQuery } from "next-sanity"

export const workCarouselQuery = defineQuery(`
  *[_type == "work"] | order(title asc) {
    _id,
    title,
    description,
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    "video": video.asset->url,
    "videoPoster": videoPoster.asset->url
  }
`)
