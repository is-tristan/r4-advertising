// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import VBDCalculator from "./components/vbd-calculator";

export const metadata = buildPageMetadata({
    title: "VBD Calculator",
    description: "Establish the commercial value of your media investment. Compare the Volume-Based Discount available through a Project or an Annual Contract with R4 Advertising.",
    path: "/calculator",
})

export default function Calculator() {

  return (

    <div className={`row headerOffset`}>

        <VBDCalculator />

    </div>

  );

}
