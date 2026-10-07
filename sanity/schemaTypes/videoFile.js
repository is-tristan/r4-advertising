import { apiVersion } from "../env"

const maxVideoBytes = 10 * 1024 * 1024

export const videoFileOptions = {
  accept: "video/webm,.webm",
}

export const videoFileDescription = "WebM only. 10MB or smaller."

export function videoFileRule(rule) {
  return rule.custom(async (value, context) => {
    if (!value?.asset?._ref) {
      return true
    }

    const client = context.getClient({ apiVersion })
    const asset = await client.fetch(
      `*[_id == $id][0]{size, mimeType, extension}`,
      { id: value.asset._ref },
    )

    if (!asset) {
      return true
    }

    const isWebm = asset.mimeType === "video/webm" || asset.extension === "webm"

    if (!isWebm) {
      return "Upload a WebM video"
    }

    if (asset.size > maxVideoBytes) {
      return "Video must be 10MB or smaller"
    }

    return true
  })
}
