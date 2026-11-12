import { NextResponse } from "next/server"

import {
  forwardJobApplication,
  mapHubspotFieldsToJobApplication,
} from "@/lib/job-application"

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request) {
  let body

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 })
  }

  const fields = body?.fields && typeof body.fields === "object" ? body.fields : body
  const context = body?.context && typeof body.context === "object" ? body.context : {}

  const payload = mapHubspotFieldsToJobApplication(fields, context)

  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      { ok: false, message: "A valid email is required" },
      { status: 400 }
    )
  }

  try {
    const result = await forwardJobApplication(payload)

    return NextResponse.json(
      {
        ok: result.ok,
        forwarded: result.body,
        is_test: payload.is_test === true,
      },
      { status: result.status }
    )
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error.message || "Failed to forward application" },
      { status: 500 }
    )
  }
}
