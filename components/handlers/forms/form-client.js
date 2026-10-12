"use client";

// React
import { useRef } from "react";

// Motion
import { motion, useInView } from "motion/react";

// Components
import HubspotForm from "@/components/handlers/forms/hubspot-form";

export default function FormClient({
    hasAnimation = true,
    portalId,
    formId,
    region = "eu1",
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <motion.div
            ref={ref}
            className="hsForm"
            animate={hasAnimation ? (isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }) : { opacity: 1, y: 0, filter: "blur(0)" }}
            initial={hasAnimation ? { opacity: 0, y: 16, filter: "blur(0.25rem)" } : { opacity: 1, y: 0, filter: "blur(0)" }}
            transition={hasAnimation ? { duration: 0.5, delay: 0.33, ease: "easeOut" } : { duration: 0, delay: 0 }}
        >

            <HubspotForm
                portalId={portalId}
                formId={formId}
                region={region}
            />

        </motion.div>

    );

}
