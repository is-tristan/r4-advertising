// Styles
import styles from "./styles/faqs.module.scss";

// Components
import FaqsSectionContentItem from "./components/faqs-section-content-item";

export default function FaqsSection({
    data = [
        {
            number: "01",
            title: "Trade",
            shortDescription: "This is where value is created and where it belongs.",
            description: "<p>Media investment creates buying power, and buying power creates commercial value. At R4, that value is treated as the client's asset, not an opaque agency margin.</p><p>Before anything is planned, we make the trading position visible. Clients then decide whether to reduce campaign cost or trade up into additional media weight, coverage or duration.</p><p>There are no retained rebates and no deferred credits. What is traded is shown. What is returned is agreed up front.</p>",
        },
        {
            number: "02",
            title: "Plan",
            shortDescription: "Decisions that hold up in the real world.",
            description: "<p>Planning starts with how people actually live, move and behave. Audience, location and consumption evidence shape where investment should work and which environments are most likely to influence action.</p><p>Decisions follow a clear order: who, where, when, what, and how much. Strategy is built from evidence, not assumptions, and agreed before activation begins.</p>",
        },
        {
            number: "03",
            title: "Activate",
            shortDescription: "Delivery governance, not box-ticking.",
            description: "<p>Activation protects the approved media position once it enters the real world. Delivery is overseen while live, verified against what was agreed, and reconciled after the campaign.</p><p>Where required, we travel to sites and inspect assets in situ. Assumption is replaced with proof, and any deviation is identified, addressed and accounted for.</p>",
        }
    ]
}) {

    return (

        <section className={`row ${styles.faqsSection}`}>

            <div className={`container ${styles.faqsSectionContainer}`}>

                <div className={styles.faqsSectionContent}>

                    {data.map((item, index) => (

                        <FaqsSectionContentItem
                            key={item.number}
                            item={item}
                            index={index}
                        />

                    ))}

                </div>

            </div>

        </section >

    )

}
