import { defineField, defineType } from "sanity"
import { PlayIcon } from "@sanity/icons/Play"
import { imageAltField } from "../imageField"
import { videoFileDescription, videoFileOptions, videoFileRule } from "../videoFile"

export const workPage = defineType({
  name: "workPage",
  title: "Work",
  type: "document",
  icon: PlayIcon,
  fields: [
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
        title: "Work",
      }
    },
  },
})
