import { defineQuery } from "next-sanity"

export const workCarouselQuery = defineQuery(`
  *[_type == "work"] | order(orderRank) {
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

export const teamGridQuery = defineQuery(`
  *[_type == "team"] | order(orderRank) {
    _id,
    name,
    "category": category->title,
    position,
    "image": image.asset->url,
    email,
    "linkedIn": linkedin
  }
`)
