import { defineQuery } from "next-sanity"

export const workCarouselQuery = defineQuery(`
  *[_type == "work" && featured == true] | order(orderRank) {
    _id,
    title,
    description,
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    "video": video.asset->url,
    videoPoster
  }
`)

export const teamGridQuery = defineQuery(`
  *[_type == "team"] | order(orderRank) {
    _id,
    name,
    "category": category->title,
    position,
    image,
    email,
    "linkedIn": linkedin
  }
`)

export const careersGridQuery = defineQuery(`
  *[_type == "career"] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    image,
    "category": category->title,
    location,
    "contractType": select(
      contractType == "full-time" => "Full-time",
      contractType == "part-time" => "Part-time",
      contractType == "contract" => "Contract",
      contractType == "internship" => "Internship",
      contractType == "freelance" => "Freelance",
      contractType
    ),
    salary,
    "excerpt": array::join(string::split(pt::text(content), "")[0...120], "")
  }
`)

export const careerBySlugQuery = defineQuery(`
  *[_type == "career" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    image,
    "category": category->title,
    location,
    "contractType": select(
      contractType == "full-time" => "Full-time",
      contractType == "part-time" => "Part-time",
      contractType == "contract" => "Contract",
      contractType == "internship" => "Internship",
      contractType == "freelance" => "Freelance",
      contractType
    ),
    salary,
    content
  }
`)

export const newsGridQuery = defineQuery(`
  *[_type == "news"] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    image,
    excerpt,
    "category": category->title,
    "author": author->name
  }
`)

export const newsBySlugQuery = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    image,
    excerpt,
    "category": category->title,
    author->{
      name,
      image
    },
    content[]{
      ...,
      _type == "video" => {
        ...,
        "url": file.asset->url,
        poster
      }
    }
  }
`)

export const relatedNewsQuery = defineQuery(`
  *[_type == "news" && slug.current != $slug] | order(
    select(category->title == $category => 0, 1) asc,
    orderRank
  )[0...3] {
    _id,
    title,
    "slug": slug.current,
    image,
    excerpt,
    "category": category->title,
    "author": author->name
  }
`)
