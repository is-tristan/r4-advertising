import { defineField, defineType } from "sanity"
import { DocumentsIcon } from "@sanity/icons/Documents"
import { imageAltField } from "../imageField"
import { videoFileDescription, videoFileOptions, videoFileRule } from "../videoFile"

const sectionImageField = (name, title) =>
  defineField({
    name,
    title,
    type: "image",
    options: {
      hotspot: true,
    },
    fields: [
      imageAltField(),
    ],
  })

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    sectionImageField("tradeSectionImage", "Trade Section Image"),
    sectionImageField("planSectionImage", "Plan Section Image"),
    defineField({
      name: "featuredVideo",
      title: "Featured Video",
      type: "file",
      description: videoFileDescription,
      options: videoFileOptions,
      validation: (rule) => videoFileRule(rule),
    }),
    defineField({
      name: "featuredVideoPoster",
      title: "Featured Video Poster",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        imageAltField(),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Services",
      }
    },
  },
})
