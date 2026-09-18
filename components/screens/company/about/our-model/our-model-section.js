// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import ThreePillars from "./components/three-pillars";

export default function OurModelSection() {

    return (

        <section className="ourModelSection">

            <div className="container noPaddingBottom">

                <Eyebrow number="04" text="Our Model" type="heading" />

            </div>

            <ThreePillars />

        </section>

    )

}