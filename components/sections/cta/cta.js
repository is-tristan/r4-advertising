// Components
import Heading from "@/components/content/text";
import ImageCol from "@/components/sections/content/components/image-col";
import CTASteps from "./components/cta-steps";
import ClickToXButton from "@/components/handlers/click-to-x-button";
import Testimonials from "@/components/sections/testimonials/testimonials";
import { defaultPlacesId } from "@/data/contact-info-data";

// Styles
import styles from "@/styles/components/sections/cta.module.scss";

export default function CTA({ phoneNumber, email, placesId }) {

    const resolvedPlacesId = placesId ?? defaultPlacesId;

    return (

        <section className={`row ${styles.cta}`}>

            <div className={`container dualCols gapLg ${styles.ctaContainer}`}>

                <div className={`contentCol colorLight ${styles.contentCol}`}>

                    <div className={`content`}>

                        <ImageCol
                            image="/images/cta-image.webp"
                            alt="Ready for your transformation?"
                            imagePosition="left"
                            className="hidden-xxl"
                            imageFill={true}
                        />

                        <Heading
                            title="Ready for your transformation?"
                        />

                        <CTASteps />

                        <Heading description="<p><strong>It's that easy!</strong> So what are you waiting for?</p>" />

                        <ClickToXButton number={phoneNumber} email={email} text="Get in touch" />

                    </div>

                </div>

                <div className={`contentCol ${styles.testimonialsCol}`}>

                    <Testimonials placesId={resolvedPlacesId} />

                </div>

            </div>

        </section>

    )
}
