"use client"; // Required for Next.js App Router

// React
import { useEffect, useId, useRef } from "react";
import Script from "next/script";

// Styles
import styles from "./styles/hubspot-form.module.scss";

const hubspotScriptSrc = "https://js-eu1.hsforms.net/forms/embed/v2.js";

export default function HubspotForm({ portalId, formId, region = "eu1" }) {

    const containerRef = useRef(null);
    const targetId = `hubspotForm${useId().replace(/:/g, "")}`;

    useEffect(() => {

        const container = containerRef.current;

        if (!container) {
            return undefined;
        }

        let cancelled = false;

        const renderForm = () => {

            if (cancelled || !container.isConnected || !window.hbspt?.forms) {
                return false;
            }

            window.hbspt.forms.create({
                portalId: portalId,
                formId: formId,
                region: region,
                target: `#${container.id}`,
            });

            return true;

        };

        if (renderForm()) {
            return () => {
                cancelled = true;
            };
        }

        const handleLoad = () => {
            renderForm();
        };

        const existingScript = document.querySelector(`script[src="${hubspotScriptSrc}"]`);

        existingScript?.addEventListener("load", handleLoad);

        const intervalId = window.setInterval(() => {

            if (renderForm()) {
                window.clearInterval(intervalId);
            }

        }, 50);

        return () => {
            cancelled = true;
            window.clearInterval(intervalId);
            existingScript?.removeEventListener("load", handleLoad);
        };

    }, [portalId, formId, region]);

    return (

        <>

            <Script
                src={hubspotScriptSrc}
                strategy="afterInteractive"
            />

            <div
                id={targetId}
                ref={containerRef}
                className={styles.hubspotForm}
            />

        </>

    );

}
