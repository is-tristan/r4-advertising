export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-15"

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export function assertEnv() {
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID")
  }

  if (!dataset) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET")
  }
}
