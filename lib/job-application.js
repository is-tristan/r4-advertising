function trimString(value) {
  return typeof value === "string" ? value.trim() : ""
}

function isHttpUrl(value) {
  return /^https?:\/\//i.test(value)
}

/**
 * Map HubSpot careers form fields (+ optional page context) to the
 * receive-job-application payload shape.
 */
export function mapHubspotFieldsToJobApplication(fields = {}, context = {}) {
  const get = (name) => trimString(fields[name])

  const firstName = get("firstname")
  const lastName = get("lastname")
  const fullName = [firstName, lastName].filter(Boolean).join(" ")

  const roleApplied = get("careers_role_applied")
  const currentJobTitle = get("jobtitle")
  const source = get("careers_source")
  const cvValue = get("upload_your_cv")

  const qualifierAnswers = {}

  const addAnswer = (label, value) => {
    if (typeof value === "boolean") {
      qualifierAnswers[label] = value ? "Yes" : "No"
      return
    }

    const text = trimString(value)

    if (text) {
      qualifierAnswers[label] = text
    }
  }

  if (currentJobTitle) {
    qualifierAnswers["Current job title"] = currentJobTitle
  }

  if (source) {
    qualifierAnswers["Where did you hear about us?"] = source
  }

  if (roleApplied && context.jobTitle) {
    qualifierAnswers["Role applying for"] = roleApplied
  }

  addAnswer("Commission structure", fields.commission_structure)
  addAnswer("Why this option", fields.why_this_option)
  addAnswer("Monthly revenue target", fields.motivating_revenue_target)
  addAnswer("Largest commission amount", fields.largest_commission_amount)
  addAnswer("Largest commission year", fields.largest_commission_year)
  addAnswer("Role at the time", fields.largest_commission_role)
  addAnswer("Revenue generated in 12 months", fields.revenue_generated_12_months)
  addAnswer("If target is missed", fields.missed_target_response)
  addAnswer("Years of experience", fields.years_experience)
  addAnswer("Primary sectors", fields.primary_sectors)
  addAnswer("Average deal size", fields.average_deal_size)
  addAnswer("Longest sales cycle", fields.longest_sales_cycle)
  addAnswer("CRM systems", fields.crm_systems)
  addAnswer("HubSpot experience", fields.has_hubspot_experience)
  addAnswer("Risk preference", fields.risk_preference)
  addAnswer("Stalled deal instinct", fields.stalled_deal_instinct)
  addAnswer("Frustration preference", fields.frustration_preference)
  addAnswer("Top performers should be paid more", fields.top_performers_paid_more)
  addAnswer("Toughest commercial setback", fields.toughest_setback)
  addAnswer("Applicant location", fields.applicant_location)
  addAnswer("Understands the revenue target", fields.understands_revenue_target)
  addAnswer("Comfortable being measured on revenue", fields.comfortable_being_measured)
  addAnswer("Understands commission terms", fields.understands_commission_terms)

  const payload = {
    full_name: fullName || get("full_name") || undefined,
    email: get("email") || undefined,
    phone: get("mobilephone") || get("phone") || undefined,
    job_title: trimString(context.jobTitle) || roleApplied || undefined,
    department: trimString(context.department) || roleApplied || undefined,
    location: trimString(context.location) || undefined,
    right_to_work: get("careers_right_to_work") || get("right_to_work") || undefined,
    linkedin_url: get("hs_linkedin_url") || get("linkedin_url") || undefined,
    cover_letter: get("applicant_description") || get("why_this_option") || undefined,
    cv_url: isHttpUrl(cvValue) ? cvValue : undefined,
    cv_base64: get("cv_base64") || undefined,
    cv_filename: get("cv_filename") || undefined,
    qualifier_answers: Object.keys(qualifierAnswers).length
      ? qualifierAnswers
      : undefined,
    auto_rejected: false,
    submitted_at: new Date().toISOString(),
    // Keep true while validating the webhook with the client.
    is_test: true,
  }

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  )
}

export async function forwardJobApplication(payload) {
  const url = process.env.JOB_APPLICATION_WEBHOOK_URL
  const secret = process.env.JOB_APPLICATION_WEBHOOK_SECRET

  if (!url || !secret) {
    return {
      ok: false,
      status: 500,
      body: { ok: false, message: "Job application webhook is not configured" },
    }
  }

  let lastResponse
  let lastBody = {}

  for (let attempt = 0; attempt < 2; attempt += 1) {
    lastResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": secret,
      },
      body: JSON.stringify(payload),
    })

    lastBody = await lastResponse.json().catch(() => ({}))

    if (lastResponse.status !== 500 || attempt === 1) {
      break
    }
  }

  return {
    ok: lastResponse.ok,
    status: lastResponse.status,
    body: lastBody,
  }
}
