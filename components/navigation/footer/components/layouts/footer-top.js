// Components
import Button from "@/components/handlers/button";

// Styles
import styles from "../../styles/footer.module.scss";

export default function FooterTop() {

    return (

        <div className={`${styles.footerTop} hidden-s hidden-m hidden-l`}>

            <Button
                hasAnimation={false}
                text="Start your brief"
                href="/contact"
            />

        </div>

    )

}