import { defineQuery } from "next-sanity"

const imageFields = /* groq */ `
  asset,
  hotspot,
  crop
`

const portableTextMediaExpansion = /* groq */ `
  ...,
  _type == "video" => {
    ...,
    "url": file.asset->url,
    poster {
      ${imageFields}
    }
  }
`

export const workCarouselQuery = defineQuery(`
  *[_type == "work" && featured == true] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    description,
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    "video": video.asset->url,
    videoPoster {
      ${imageFields}
    }
  }
`)

export const featuredVideoQuery = defineQuery(`
  *[_type == "work"] | order(orderRank)[0] {
    _id,
    "video": video.asset->url,
    videoPoster {
      ${imageFields}
    }
  }
`)

const workGridFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  "category": categories[0]->title,
  "image": coalesce(gallery[0], videoPoster) {
    ${imageFields}
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
`

export const workGridQuery = defineQuery(`
  *[_type == "work"] | order(orderRank)[0...6] {
    ${workGridFields}
  }
`)

export const workGridCountQuery = defineQuery(`
  count(*[_type == "work" && ($categoryId == "" || $categoryId in categories[]._ref)])
`)

export function workGridPageQuery(start, end) {
  return defineQuery(`
    *[_type == "work" && ($categoryId == "" || $categoryId in categories[]._ref)]
    | order(orderRank)[${start}...${end}] {
      ${workGridFields}
    }
  `)
}

export const workCategoriesQuery = defineQuery(`
  *[_type == "workCategory"] | order(title asc) {
    _id,
    "label": title,
    "slug": slug.current
  }
`)

export const workBySlugQuery = defineQuery(`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    year,
    featured,
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    "video": video.asset->url,
    videoPoster {
      ${imageFields}
    },
    gallery[]{
      _key,
      ${imageFields}
    },
    tradeContent[]{
      ${portableTextMediaExpansion}
    },
    planContent[]{
      ${portableTextMediaExpansion}
    },
    activateContent[]{
      ${portableTextMediaExpansion}
    },
    resultContent[]{
      ${portableTextMediaExpansion}
    },
    testimonialContent[]{
      ${portableTextMediaExpansion}
    }
  }
`)

export const teamGridQuery = defineQuery(`
  *[_type == "team"] | order(orderRank) {
    _id,
    name,
    "category": category->title,
    position,
    image {
      ${imageFields}
    },
    email,
    "linkedIn": linkedin
  }
`)

export const careersGridQuery = defineQuery(`
  *[_type == "career"] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    image {
      ${imageFields}
    },
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
    image {
      ${imageFields}
    },
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
    content,
    "description": array::join(string::split(pt::text(content), "")[0...160], "")
  }
`)

export const legalBySlugQuery = defineQuery(`
  *[_type == "legal" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    content,
    "description": array::join(string::split(pt::text(content), "")[0...160], "")
  }
`)

export const newsGridQuery = defineQuery(`
  *[_type == "news"] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    image {
      ${imageFields}
    },
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
    image {
      ${imageFields}
    },
    excerpt,
    "category": category->title,
    author->{
      name,
      image {
        ${imageFields}
      }
    },
    content[]{
      ${portableTextMediaExpansion}
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
    image {
      ${imageFields}
    },
    excerpt,
    "category": category->title,
    "author": author->name
  }
`)

export const sitemapQuery = defineQuery(`
  {
    "work": *[_type == "work" && defined(slug.current)] | order(orderRank) {
      "slug": slug.current,
      _updatedAt
    },
    "news": *[_type == "news" && defined(slug.current)] | order(orderRank) {
      "slug": slug.current,
      _updatedAt
    },
    "careers": *[_type == "career" && defined(slug.current)] | order(orderRank) {
      "slug": slug.current,
      _updatedAt
    },
    "legal": *[_type == "legal" && defined(slug.current)] | order(title asc) {
      "slug": slug.current,
      _updatedAt
    }
  }
`)
