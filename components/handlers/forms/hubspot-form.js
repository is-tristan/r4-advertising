"use client"; // Required for Next.js App Router

// React
import { useEffect } from "react";
import Script from "next/script";

export default function HubspotForm({ portalId, formId, region = "eu1" }) {

    useEffect(() => {

        if (window.hbspt) {
            window.hbspt.forms.create({
                portalId: portalId,
                formId: formId,
                target: "#hubspotFormInit",
                region: region,
            });
        }

    }, [portalId, formId]);

    const handleScriptLoad = () => {
        if (window.hbspt) {
            window.hbspt.forms.create({
                portalId: portalId,
                formId: formId,
                target: "#hubspotFormInit",
                region: region,
            });
        }
    };

    return (

        <>

            <Script
                src="https://hsforms.net"
                onLoad={handleScriptLoad}
                strategy="afterInteractive"
            />

            <div id="hubspotFormInit"></div>

        </>

    );

}