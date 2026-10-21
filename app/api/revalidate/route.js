import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

import { sitemapDocumentTypes, sitemapTag } from "@/lib/seo"

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json({ message: "Missing SANITY_REVALIDATE_SECRET" }, { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody(request, secret)

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing document type" }, { status: 400 })
    }

    if (!sitemapDocumentTypes.includes(body._type)) {
      return NextResponse.json({ revalidated: false, type: body._type })
    }

    revalidateTag(sitemapTag, { expire: 0 })
    revalidatePath("/sitemap.xml")

    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
