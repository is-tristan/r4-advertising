"use client"; // Required for Next.js App Router

// React
import { useEffect, useId, useRef } from "react";
import Script from "next/script";

const hubspotScriptSrc = "https://js-eu1.hsforms.net/forms/embed/v2.js";

function getFormElement(form) {
    if (!form) {
        return null;
    }

    if (form.jquery && typeof form.get === "function") {
        return form.get(0) || null;
    }

    if (form.tagName === "FORM") {
        return form;
    }

    return form.querySelector?.("form") || null;
}

function readHubspotFormFields(form, submissionData) {
    const submissionValues = submissionData?.submissionValues;

    if (submissionValues && typeof submissionValues === "object") {
        return Object.fromEntries(
            Object.entries(submissionValues).map(([key, value]) => [
                key,
                Array.isArray(value) ? value.join(", ") : value,
            ])
        );
    }

    const formElement = getFormElement(form);
    const fields = {};

    if (!formElement) {
        return fields;
    }

    for (const element of formElement.querySelectorAll("input, select, textarea")) {
        const name = element.name;

        if (!name || element.type === "submit" || element.type === "button") {
            continue;
        }

        if (element.type === "checkbox" || element.type === "radio") {
            if (element.checked) {
                fields[name] = element.value;
            }
            continue;
        }

        if (element.type === "file") {
            if (element.files?.[0]?.name) {
                fields[name] = element.files[0].name;
            } else if (element.value) {
                fields[name] = element.value;
            }
            continue;
        }

        fields[name] = element.value;
    }

    return fields;
}

async function forwardHubspotJobApplication(form, submissionData, jobContext) {
    const fields = readHubspotFormFields(form, submissionData);

    try {
        const response = await fetch("/api/job-application", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fields,
                context: jobContext || {},
            }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error("[job-application] Forward failed", response.status, data);
            return;
        }

        console.info("[job-application] Forwarded", data);
    } catch (error) {
        console.error("[job-application] Forward error", error);
    }
}

export default function HubspotForm({
    portalId,
    formId,
    region = "eu1",
    forwardJobApplication = false,
    jobContext = undefined,
}) {

    const containerRef = useRef(null);
    const jobContextRef = useRef(jobContext);
    const targetId = `hubspotForm${useId().replace(/:/g, "")}`;
    const renderedRef = useRef(false);

    jobContextRef.current = jobContext;

    useEffect(() => {

        const container = containerRef.current;

        if (!container) {
            return undefined;
        }

        let cancelled = false;
        renderedRef.current = false;

        const renderForm = () => {

            if (
                cancelled
                || !container.isConnected
                || !window.hbspt?.forms
                || renderedRef.current
            ) {
                return Boolean(renderedRef.current);
            }

            container.replaceChildren();

            const createOptions = {
                portalId: portalId,
                formId: formId,
                region: region,
                target: `#${container.id}`,
            };

            if (forwardJobApplication) {
                createOptions.onFormSubmitted = (form, data) => {
                    forwardHubspotJobApplication(form, data, jobContextRef.current);
                };
            }

            window.hbspt.forms.create(createOptions);
            renderedRef.current = true;

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

    }, [portalId, formId, region, forwardJobApplication]);

    return (

        <>

            <Script
                src={hubspotScriptSrc}
                strategy="afterInteractive"
            />

            <div
                id={targetId}
                ref={containerRef}
            />

        </>

    );

}
