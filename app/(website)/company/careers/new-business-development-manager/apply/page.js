// SEO
import { buildRouteMetadata } from "@/lib/pageSeo"

// Components
import NewBusinessDevelopmentManagerApply from "@/components/screens/company/careers/new-business-development-manager/apply/new-business-development-manager-apply"

export async function generateMetadata() {
  return buildRouteMetadata({
    title: "Apply — New Business Development Manager",
    description: "Apply for the New Business Development Manager role at R4. Choose a commission structure and tell us how you sell.",
    path: "/company/careers/new-business-development-manager/apply",
  })
}

export default function NewBusinessDevelopmentManagerApplyPage() {
  return <NewBusinessDevelopmentManagerApply />
}
