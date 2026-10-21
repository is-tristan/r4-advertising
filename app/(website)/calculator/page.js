// SEO
import { buildPageMetadata } from "@/lib/seo"

// Components
import VBDCalculator from "./components/vbd-calculator";

export const metadata = buildPageMetadata({
    title: "Media Investment Discount Calculator",
    description: "Your media investment creates commercial value. Use R4 Advertising's calculator to explore the potential volume-based discount your budget could unlock.",
    path: "/calculator",
})

export default function Calculator() {

  return (

    <div className={`row headerOffset`}>

        <VBDCalculator />

    </div>

  );

}
