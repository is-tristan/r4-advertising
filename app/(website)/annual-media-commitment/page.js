// SEO
import { buildRouteMetadata } from "@/lib/pageSeo"

// Components
import AnnualMediaCommitment from "./components/AnnualMediaCommitment";

export async function generateMetadata() {
    return buildRouteMetadata({
        title: "Annual Media Commitment",
        description: "A 12-month commercial agreement between the Client and R4 Advertising covering Qualifying Media Investment, Contract VBD, Contractual Trade-Up Value, commercial audit and reconciliation.",
        path: "/annual-media-commitment",
    })
}

export default function AnnualMediaCommitmentPage() {

  return (

    <div className={`row headerOffset`}>

        <AnnualMediaCommitment />

    </div>

  );

}
