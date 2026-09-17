import { defineArrayMember, defineField } from "sanity"
import { PlayIcon } from "@sanity/icons/Play"

export const contentVideoMember = defineArrayMember({
  type: "object",
  name: "video",
  title: "Video",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "file",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "file.asset.originalFilename",
      media: "poster",
    },
    prepare({ title, media }) {
      return {
        title: title || "Video",
        media,
      }
    },
  },
})
