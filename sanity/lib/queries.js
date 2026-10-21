import { defineQuery } from "next-sanity"

const imageFields = /* groq */ `
  alt,
  asset,
  hotspot,
  crop
`

const seoDescriptionField = /* groq */ `array::join(
  string::split(
    pt::text(content[_type == "block" && style == "normal" && !string::startsWith(children[0].text, "Last updated")]),
    ""
  )[0...320],
  ""
)`

const portableTextMediaExpansion = /* groq */ `
  ...,
  _type == "video" => {
    ...,
    "url": file.asset->url,
    poster {
      ${imageFields}
    }
  },
  _type == "image" => {
    ...,
    alt,
    asset,
    hotspot,
    crop
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
    "hasFeaturedVideo": defined(video.asset),
    "video": coalesce(
      video.asset->url,
      select(gallery[0]._type == "file" => gallery[0].asset->url)
    ),
    "image": coalesce(
      select(defined(video.asset) => videoPoster),
      select(gallery[0]._type == "file" => gallery[0].videoPoster),
      select(gallery[0]._type == "image" => gallery[0])
    ) {
      ${imageFields}
    }
  }
`)

export const featuredVideoQuery = defineQuery(`
  *[_id == "workPage"][0] {
    _id,
    "title": "Featured work",
    "video": featuredVideo.asset->url,
    "videoPoster": featuredVideoPoster {
      ${imageFields}
    }
  }
`)

export const servicesFeaturedVideoQuery = defineQuery(`
  *[_id == "servicesPage"][0] {
    _id,
    "title": "Activate",
    "video": featuredVideo.asset->url,
    "videoPoster": featuredVideoPoster {
      ${imageFields}
    }
  }
`)

export const servicesPageQuery = defineQuery(`
  *[_id == "servicesPage"][0] {
    _id,
    tradeSectionImage {
      ${imageFields}
    },
    planSectionImage {
      ${imageFields}
    }
  }
`)

const workGridFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  "category": categories[0]->title,
  "image": coalesce(
    gallery[_type == "image"][0],
    gallery[_type == "file"][0].videoPoster,
    videoPoster
  ) {
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
    "seoImage": coalesce(
      select(defined(videoPoster.asset) => videoPoster),
      gallery[_type == "image" && defined(asset)][0],
      gallery[_type == "file" && defined(videoPoster.asset)][0].videoPoster
    ) {
      ${imageFields}
    },
    gallery[]{
      _key,
      _type,
      _type == "image" => {
        ${imageFields}
      },
      _type == "file" => {
        "video": asset->url,
        videoPoster {
          ${imageFields}
        }
      }
    },
    tradeEyebrow,
    tradeTitle,
    tradeContent[]{
      ${portableTextMediaExpansion}
    },
    planEyebrow,
    planTitle,
    planContent[]{
      ${portableTextMediaExpansion}
    },
    activateEyebrow,
    activateTitle,
    activateContent[]{
      ${portableTextMediaExpansion}
    },
    resultEyebrow,
    resultTitle,
    resultContent[]{
      ${portableTextMediaExpansion}
    },
    testimonialContent,
    seoTitle,
    seoDescription
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
    "locations": locations[0...2]->{
      _id,
      title
    },
    "location": array::join(locations[0...2]->title, " / "),
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
    "location": array::join(locations[0...2]->title, " / "),
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
    "description": ${seoDescriptionField}
  }
`)

export const legalBySlugQuery = defineQuery(`
  *[_type == "legal" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    content,
    "description": ${seoDescriptionField}
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
    _createdAt,
    _updatedAt,
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
    },
    seoTitle,
    seoDescription
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
      _updatedAt,
      "image": coalesce(
        select(defined(videoPoster.asset) => videoPoster),
        gallery[_type == "image" && defined(asset)][0],
        gallery[_type == "file" && defined(videoPoster.asset)][0].videoPoster
      ) {
        ${imageFields}
      }
    },
    "news": *[_type == "news" && defined(slug.current)] | order(orderRank) {
      "slug": slug.current,
      _updatedAt,
      image {
        ${imageFields}
      }
    },
    "careers": *[_type == "career" && defined(slug.current)] | order(orderRank) {
      "slug": slug.current,
      _updatedAt,
      image {
        ${imageFields}
      }
    },
    "legal": *[_type == "legal" && defined(slug.current)] | order(title asc) {
      "slug": slug.current,
      _updatedAt
    },
    "teamUpdatedAt": *[_type == "team"] | order(_updatedAt desc)[0]._updatedAt,
    "workPageUpdatedAt": *[_id == "workPage"][0]._updatedAt,
    "servicesPageUpdatedAt": *[_id == "servicesPage"][0]._updatedAt
  }
`)
