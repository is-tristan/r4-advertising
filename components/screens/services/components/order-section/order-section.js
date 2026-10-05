// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import OrderSectionItem from "./components/order-section-item";

// Data
import { planOrderSectionData } from "@/app/(website)/services/data/services-data";

// Syles
import styles from "./styles/order-section.module.scss";

export default function OrderSection({
    containerClass = undefined,
    eyebrow = "The order of decisions",
    data = planOrderSectionData
}) {

    return (

        <div className={`container ${containerClass ? containerClass : undefined} ${styles.orderSection}`}>

            {eyebrow && (
                <Eyebrow
                    separator={null}
                    number={null}
                    text={eyebrow}
                    type="heading"
                    size="large"
                    className={`colorLight ${styles.orderSectionEyebrow}`}
                />
            )}

            <div className={styles.orderSectionContent}>

                {data.map((item, index) => (

                    <OrderSectionItem key={item.title} item={item} index={index} />

                ))}

            </div>

        </div>

    )

}