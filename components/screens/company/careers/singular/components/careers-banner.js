// Components
import Text from "@/components/content/text/text";
import CareerMetaItem from "@/components/screens/company/careers/components/career-meta-item";

// Styles
import styles from "@/components/sections/banner/styles/banner.module.scss";

export default function CareersBanner({
    title,
    contractType,
    location,
    salary,
}) {

    return (

        <section id="banner" className={`row ${styles.banner}`} >

            <div className={`container condensed`}>

                <div className={`content gapXl ${styles.bannerContent}`}>

                    <Text
                        eyebrow="Apply now"
                        titleTag="h1"
                        title={title}
                    />

                    <CareerMetaItem
                        contractType={contractType}
                        location={location}
                        salary={salary}
                    />

                </div>

            </div>

        </section>

    );

}
