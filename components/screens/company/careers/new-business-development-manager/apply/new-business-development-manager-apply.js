"use client";

// Next
import Link from "next/link";

// Imports
import { useState } from "react";

// Components
import Eyebrow from "@/components/content/eyebrow/eyebrow";
import Button from "@/components/handlers/button";

// Icons
import { arrowLeft } from "@/utils/icons";

// Styles
import styles from "./styles/new-business-development-manager-apply.module.scss";

const totalSteps = 7;
const maxCvBytes = 2 * 1024 * 1024;

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = String(reader.result || "");
            const base64 = result.includes(",") ? result.split(",")[1] : result;
            resolve(base64);
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

const commissionOptions = [
    {
        value: "Foundation Operator",
        label: "Option A — Foundation Operator",
        detail: "£60,000 base / 2% commission / quarterly accelerator",
    },
    {
        value: "Momentum Builder",
        label: "Option B — Momentum Builder",
        detail: "£50,000 base / 3.5% commission / quarterly accelerator",
    },
    {
        value: "Revenue Hunter",
        label: "Option C — Revenue Hunter",
        detail: "£40,000 base / 5% commission / quarterly accelerator",
    },
];

const riskOptions = [
    { value: "I prefer certainty and steady progression", label: "I prefer certainty and steady progression" },
    { value: "I prefer leverage and upside", label: "I prefer leverage and upside" },
    { value: "I prefer risk if the reward is meaningful", label: "I prefer risk if the reward is meaningful" },
];

const instinctOptions = [
    { value: "Reframe the value", label: "Reframe the value" },
    { value: "Re-engage with urgency", label: "Re-engage with urgency" },
    { value: "Walk away and replace it in pipeline", label: "Walk away and replace it in pipeline" },
];

const frustrationOptions = [
    { value: "Missing target by a small margin", label: "Missing target by a small margin" },
    { value: "Hitting target but knowing you left money on the table", label: "Hitting target but knowing you left money on the table" },
];

const yesNoOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
];

const initialValues = {
    commissionStructure: "",
    whyThisOption: "",
    motivatingRevenueTarget: "",
    largestCommissionAmount: "",
    largestCommissionYear: "",
    largestCommissionRole: "",
    revenueGenerated12Months: "",
    missedTargetResponse: "",
    yearsExperience: "",
    primarySectors: "",
    averageDealSize: "",
    longestSalesCycle: "",
    crmSystems: "",
    hasHubspotExperience: false,
    riskPreference: "",
    stalledDealInstinct: "",
    frustrationPreference: "",
    topPerformersPaidMore: "",
    toughestSetback: "",
    fullName: "",
    email: "",
    phone: "",
    applicantLocation: "",
    rightToWork: "",
    linkedinUrl: "",
    cvFile: null,
    understandsRevenueTarget: false,
    comfortableBeingMeasured: false,
    understandsCommissionTerms: false,
};

function required(value) {
    return typeof value === "string" && value.trim() ? "" : "Required";
}

function minimumLength(value, minimum) {
    if (!value || value.trim().length < minimum) {
        return `Please provide at least ${minimum} characters`;
    }

    return "";
}

function validateStep(step, values) {
    const errors = {};

    if (step === 1 && !values.commissionStructure) {
        errors.commissionStructure = "Please select a commission structure";
    }

    if (step === 2) {
        const message = minimumLength(values.whyThisOption, 100);

        if (message) {
            errors.whyThisOption = message;
        }
    }

    if (step === 3) {
        const target = required(values.motivatingRevenueTarget);
        const missed = required(values.missedTargetResponse);

        if (target) {
            errors.motivatingRevenueTarget = target;
        }

        if (missed) {
            errors.missedTargetResponse = missed;
        }
    }

    if (step === 4) {
        [
            ["yearsExperience", values.yearsExperience],
            ["primarySectors", values.primarySectors],
            ["averageDealSize", values.averageDealSize],
            ["longestSalesCycle", values.longestSalesCycle],
            ["crmSystems", values.crmSystems],
        ].forEach(([key, value]) => {
            const message = required(value);

            if (message) {
                errors[key] = message;
            }
        });
    }

    if (step === 5) {
        [
            ["riskPreference", values.riskPreference],
            ["stalledDealInstinct", values.stalledDealInstinct],
            ["frustrationPreference", values.frustrationPreference],
            ["topPerformersPaidMore", values.topPerformersPaidMore],
        ].forEach(([key, value]) => {
            if (!value) {
                errors[key] = "Required";
            }
        });
    }

    if (step === 6) {
        const message = minimumLength(values.toughestSetback, 100);

        if (message) {
            errors.toughestSetback = message;
        }
    }

    if (step === 7) {
        const name = required(values.fullName);
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ? "" : "A valid email is required";
        const phone = required(values.phone);
        const location = required(values.applicantLocation);
        const rightToWork = required(values.rightToWork);

        if (name) {
            errors.fullName = name;
        }

        if (email) {
            errors.email = email;
        }

        if (phone) {
            errors.phone = phone;
        }

        if (location) {
            errors.applicantLocation = location;
        }

        if (rightToWork) {
            errors.rightToWork = rightToWork;
        }

        if (values.cvFile && values.cvFile.type !== "application/pdf") {
            errors.cvFile = "Upload a PDF";
        }

        if (values.cvFile && values.cvFile.size > maxCvBytes) {
            errors.cvFile = "PDF must be 2MB or smaller";
        }

        if (!values.understandsRevenueTarget) {
            errors.understandsRevenueTarget = "Required";
        }

        if (!values.comfortableBeingMeasured) {
            errors.comfortableBeingMeasured = "Required";
        }

        if (!values.understandsCommissionTerms) {
            errors.understandsCommissionTerms = "Required";
        }
    }

    return errors;
}

function Field({
    label,
    hint,
    error,
    children,
}) {
    return (

        <div className={styles.field}>

            <label>

                {label}

            </label>

            {hint && (

                <p className={styles.hint}>{hint}</p>

            )}

            {children}

            {error && (

                <p className={styles.error}>{error}</p>

            )}

        </div>

    );
}

function ChoiceGroup({
    legend,
    hint,
    name,
    value,
    options,
    error,
    onChange,
}) {
    return (

        <fieldset className={styles.choiceGroup}>

            <legend>{legend}</legend>

            {hint && (

                <p className={styles.hint}>{hint}</p>

            )}

            <div className={styles.choices}>

                {options.map((option) => (

                    <label
                        key={option.value}
                        className={styles.choice}
                        data-selected={value === option.value}
                    >

                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                        />

                        <span>

                            <strong>{option.label}</strong>

                            {option.detail && (

                                <small>{option.detail}</small>

                            )}

                        </span>

                    </label>

                ))}

            </div>

            {error && (

                <p className={styles.error}>{error}</p>

            )}

        </fieldset>

    );
}

function CheckField({
    label,
    checked,
    error,
    onChange,
}) {
    return (

        <div className={styles.field}>

            <label className={styles.check}>

                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => onChange(event.target.checked)}
                />

                <span>{label}</span>

            </label>

            {error && (

                <p className={styles.error}>{error}</p>

            )}

        </div>

    );
}

export default function NewBusinessDevelopmentManagerApply() {
    const [step, setStep] = useState(1);
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    const update = (key, value) => {
        setValues((current) => ({
            ...current,
            [key]: value,
        }));
        setErrors((current) => {
            if (!current[key]) {
                return current;
            }

            const next = { ...current };
            delete next[key];
            return next;
        });
    };

    const goToStep = (nextStep) => {
        setStep(nextStep);
        setErrors({});
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const submitApplication = async () => {
        setIsSubmitting(true);
        setSubmitError("");

        try {
            let cvBase64 = "";

            if (values.cvFile) {
                cvBase64 = await readFileAsBase64(values.cvFile);
            }

            const response = await fetch("/api/job-application", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fields: {
                        full_name: values.fullName,
                        email: values.email,
                        phone: values.phone,
                        right_to_work: values.rightToWork,
                        linkedin_url: values.linkedinUrl,
                        commission_structure: values.commissionStructure,
                        why_this_option: values.whyThisOption,
                        motivating_revenue_target: values.motivatingRevenueTarget,
                        largest_commission_amount: values.largestCommissionAmount,
                        largest_commission_year: values.largestCommissionYear,
                        largest_commission_role: values.largestCommissionRole,
                        revenue_generated_12_months: values.revenueGenerated12Months,
                        missed_target_response: values.missedTargetResponse,
                        years_experience: values.yearsExperience,
                        primary_sectors: values.primarySectors,
                        average_deal_size: values.averageDealSize,
                        longest_sales_cycle: values.longestSalesCycle,
                        crm_systems: values.crmSystems,
                        has_hubspot_experience: values.hasHubspotExperience,
                        risk_preference: values.riskPreference,
                        stalled_deal_instinct: values.stalledDealInstinct,
                        frustration_preference: values.frustrationPreference,
                        top_performers_paid_more: values.topPerformersPaidMore,
                        toughest_setback: values.toughestSetback,
                        applicant_location: values.applicantLocation,
                        cv_base64: cvBase64,
                        cv_filename: values.cvFile?.name || "",
                        understands_revenue_target: values.understandsRevenueTarget,
                        comfortable_being_measured: values.comfortableBeingMeasured,
                        understands_commission_terms: values.understandsCommissionTerms,
                    },
                    context: {
                        jobTitle: "New Business Development Manager",
                        department: "Trade",
                        location: "London",
                    },
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setSubmitError(data.message || "Application could not be sent");
                return;
            }

            setIsComplete(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
            setSubmitError("Application could not be sent");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validateStep(step, values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length) {
            return;
        }

        if (step < totalSteps) {
            goToStep(step + 1);
            return;
        }

        submitApplication();
    };

    const stepContent = () => {
        if (step === 1) {
            return (

                <>

                    <div className={styles.heading}>

                        <h2>Choose your commission structure</h2>

                        <p className={styles.hint}>(Mandatory selection)</p>

                    </div>

                    <ChoiceGroup
                        legend="Which commission structure are you applying under?"
                        hint="You may move up over time. You cannot move down."
                        name="commissionStructure"
                        value={values.commissionStructure}
                        options={commissionOptions}
                        error={errors.commissionStructure}
                        onChange={(value) => update("commissionStructure", value)}
                    />

                </>

            );
        }

        if (step === 2) {
            return (

                <>

                    <div className={styles.heading}>

                        <h2>Your why</h2>

                        <p className={styles.hint}>(Non-negotiable)</p>

                    </div>

                    <Field
                        label="Why have you chosen this option?"
                        hint="Tell us what motivates you, how you assess risk, and what you expect to earn. We are not looking for the right answer. We are looking for self-awareness, intent, and commercial thinking."
                        error={errors.whyThisOption}
                    >

                        <textarea
                            value={values.whyThisOption}
                            placeholder="Minimum 100 characters..."
                            onChange={(event) => update("whyThisOption", event.target.value)}
                        />

                        <p className={styles.counter}>{values.whyThisOption.length} / 100 characters minimum</p>

                    </Field>

                </>

            );
        }

        if (step === 3) {
            return (

                <>

                    <div className={styles.heading}>

                        <h2>Commercial reality check</h2>

                        <p className={styles.hint}>(Short answers – required)</p>

                    </div>

                    <div className={styles.fields}>

                        <Field
                            label="What monthly revenue target motivates you?"
                            hint="(Number, not words)"
                            error={errors.motivatingRevenueTarget}
                        >

                            <input
                                type="number"
                                value={values.motivatingRevenueTarget}
                                placeholder="£"
                                onChange={(event) => update("motivatingRevenueTarget", event.target.value)}
                            />

                        </Field>

                        <div className={styles.field}>

                            <label>What was the largest single commission payment you have earned?</label>

                            <div className={styles.grid}>

                                <Field label="Amount (£)">

                                    <input
                                        type="number"
                                        value={values.largestCommissionAmount}
                                        placeholder="Amount"
                                        onChange={(event) => update("largestCommissionAmount", event.target.value)}
                                    />

                                </Field>

                                <Field label="Year">

                                    <input
                                        value={values.largestCommissionYear}
                                        placeholder="Year"
                                        onChange={(event) => update("largestCommissionYear", event.target.value)}
                                    />

                                </Field>

                                <Field label="Role at the time">

                                    <input
                                        value={values.largestCommissionRole}
                                        placeholder="Role"
                                        onChange={(event) => update("largestCommissionRole", event.target.value)}
                                    />

                                </Field>

                            </div>

                        </div>

                        <Field
                            label="What is the most money you have personally generated in a 12-month period?"
                            hint="(Revenue, not commission)"
                        >

                            <input
                                type="number"
                                value={values.revenueGenerated12Months}
                                placeholder="£"
                                onChange={(event) => update("revenueGenerated12Months", event.target.value)}
                            />

                        </Field>

                        <Field
                            label="If you missed target for two consecutive months, what would you change first?"
                            hint="(Approach, pipeline, behaviour — be specific)"
                            error={errors.missedTargetResponse}
                        >

                            <textarea
                                value={values.missedTargetResponse}
                                onChange={(event) => update("missedTargetResponse", event.target.value)}
                            />

                        </Field>

                    </div>

                </>

            );
        }

        if (step === 4) {
            return (

                <>

                    <div className={styles.heading}>

                        <h2>Experience and proof</h2>

                        <p className={styles.hint}>(Structured)</p>

                    </div>

                    <div className={styles.fields}>

                        <Field label="Years of commercial / sales / trading experience" error={errors.yearsExperience}>

                            <input
                                value={values.yearsExperience}
                                onChange={(event) => update("yearsExperience", event.target.value)}
                            />

                        </Field>

                        <Field label="Primary sectors you have sold into" error={errors.primarySectors}>

                            <input
                                value={values.primarySectors}
                                placeholder="e.g. FMCG, Tech, Finance..."
                                onChange={(event) => update("primarySectors", event.target.value)}
                            />

                        </Field>

                        <Field label="Average deal size you are comfortable closing" error={errors.averageDealSize}>

                            <input
                                value={values.averageDealSize}
                                placeholder="e.g. £50k - £200k"
                                onChange={(event) => update("averageDealSize", event.target.value)}
                            />

                        </Field>

                        <Field label="Longest sales cycle you have successfully managed" error={errors.longestSalesCycle}>

                            <input
                                value={values.longestSalesCycle}
                                placeholder="e.g. 6 months"
                                onChange={(event) => update("longestSalesCycle", event.target.value)}
                            />

                        </Field>

                        <Field label="CRM systems used" error={errors.crmSystems}>

                            <input
                                value={values.crmSystems}
                                placeholder="e.g. Salesforce, HubSpot, Pipedrive..."
                                onChange={(event) => update("crmSystems", event.target.value)}
                            />

                        </Field>

                        <CheckField
                            label="I have HubSpot experience"
                            checked={values.hasHubspotExperience}
                            onChange={(checked) => update("hasHubspotExperience", checked)}
                        />

                    </div>

                </>

            );
        }

        if (step === 5) {
            return (

                <>

                    <div className={styles.heading}>

                        <h2>Pressure and psychology</h2>

                        <p className={styles.hint}>(These matter more than CVs)</p>

                        <p>Answer honestly.</p>

                    </div>

                    <div className={styles.fields}>

                        <ChoiceGroup
                            legend="Which statement best describes you?"
                            name="riskPreference"
                            value={values.riskPreference}
                            options={riskOptions}
                            error={errors.riskPreference}
                            onChange={(value) => update("riskPreference", value)}
                        />

                        <ChoiceGroup
                            legend="When a deal stalls late-stage, your instinct is to:"
                            name="stalledDealInstinct"
                            value={values.stalledDealInstinct}
                            options={instinctOptions}
                            error={errors.stalledDealInstinct}
                            onChange={(value) => update("stalledDealInstinct", value)}
                        />

                        <ChoiceGroup
                            legend="What frustrates you more?"
                            name="frustrationPreference"
                            value={values.frustrationPreference}
                            options={frustrationOptions}
                            error={errors.frustrationPreference}
                            onChange={(value) => update("frustrationPreference", value)}
                        />

                        <ChoiceGroup
                            legend="Do you believe top performers should be paid materially more than average performers?"
                            name="topPerformersPaidMore"
                            value={values.topPerformersPaidMore}
                            options={yesNoOptions}
                            error={errors.topPerformersPaidMore}
                            onChange={(value) => update("topPerformersPaidMore", value)}
                        />

                    </div>

                </>

            );
        }

        if (step === 6) {
            return (

                <>

                    <div className={styles.heading}>

                        <h2>Obstacles and resilience</h2>

                        <p className={styles.hint}>(Free text)</p>

                    </div>

                    <Field
                        label="Describe the toughest commercial setback you have faced."
                        hint="What went wrong, what you learned, and how you adjusted. We care about recovery, not perfection."
                        error={errors.toughestSetback}
                    >

                        <textarea
                            value={values.toughestSetback}
                            placeholder="Minimum 100 characters..."
                            onChange={(event) => update("toughestSetback", event.target.value)}
                        />

                        <p className={styles.counter}>{values.toughestSetback.length} / 100 characters minimum</p>

                    </Field>

                </>

            );
        }

        return (

            <>

                <div className={styles.heading}>

                    <h2>Practicalities</h2>

                    <p className={styles.hint}>(Standard but required)</p>

                </div>

                <div className={styles.fields}>

                    <Field label="Full name *" error={errors.fullName}>

                        <input
                            value={values.fullName}
                            onChange={(event) => update("fullName", event.target.value)}
                        />

                    </Field>

                    <Field label="Email *" error={errors.email}>

                        <input
                            type="email"
                            value={values.email}
                            onChange={(event) => update("email", event.target.value)}
                        />

                    </Field>

                    <Field label="Phone *" error={errors.phone}>

                        <input
                            type="tel"
                            value={values.phone}
                            onChange={(event) => update("phone", event.target.value)}
                        />

                    </Field>

                    <Field label="Location *" error={errors.applicantLocation}>

                        <input
                            value={values.applicantLocation}
                            placeholder="City, Country"
                            onChange={(event) => update("applicantLocation", event.target.value)}
                        />

                    </Field>

                    <Field label="Right to work *" error={errors.rightToWork}>

                        <input
                            value={values.rightToWork}
                            placeholder="UK / US / Other"
                            onChange={(event) => update("rightToWork", event.target.value)}
                        />

                    </Field>

                    <Field label="LinkedIn profile">

                        <input
                            value={values.linkedinUrl}
                            placeholder="https://linkedin.com/in/..."
                            onChange={(event) => update("linkedinUrl", event.target.value)}
                        />

                    </Field>

                    <Field label="CV upload (PDF)" hint="PDF, 2MB or smaller." error={errors.cvFile}>

                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(event) => update("cvFile", event.target.files?.[0] || null)}
                        />

                    </Field>

                    <div className={styles.heading}>

                        <h2>Final declaration</h2>

                    </div>

                    <CheckField
                        label="I understand this is a performance-led role with a £163,000 monthly revenue target."
                        checked={values.understandsRevenueTarget}
                        error={errors.understandsRevenueTarget}
                        onChange={(checked) => update("understandsRevenueTarget", checked)}
                    />

                    <CheckField
                        label="I am comfortable being measured primarily on revenue delivered."
                        checked={values.comfortableBeingMeasured}
                        error={errors.comfortableBeingMeasured}
                        onChange={(checked) => update("comfortableBeingMeasured", checked)}
                    />

                    <CheckField
                        label="I understand commission is paid on revenue received from clients."
                        checked={values.understandsCommissionTerms}
                        error={errors.understandsCommissionTerms}
                        onChange={(checked) => update("understandsCommissionTerms", checked)}
                    />

                </div>

            </>

        );
    };

    return (

        <section className="row headerOffset">

            <div className="container condensed gapLg">

                <Link href="/company/careers/new-business-development-manager" className="textLink">

                    <div className="icon" dangerouslySetInnerHTML={{ __html: arrowLeft }} />

                    <span>Back to role</span>

                </Link>

                {isComplete ? (

                    <div className={styles.success}>

                        <Eyebrow number="08" text="Application" />

                        <h1>Application received</h1>

                        <p>Submission confirms seriousness. We will be in touch if we want to take this further.</p>

                        <Button text="Back to careers" href="/company/careers" className="primary" />

                    </div>

                ) : (

                    <form className="content gapLg" onSubmit={handleSubmit}>

                        <div className={styles.intro}>

                            <Eyebrow number="Apply" text="New Business Development Manager" />

                            <h1>Step {step} of {totalSteps}</h1>

                        </div>

                        <div className={styles.progress} aria-hidden="true">

                            <span style={{ width: `${(step / totalSteps) * 100}%` }} />

                        </div>

                        <ol className={styles.steps}>

                            {Array.from({ length: totalSteps }, (_, index) => {

                                const number = index + 1;

                                return (

                                    <li key={number}>

                                        <button
                                            type="button"
                                            className={styles.step}
                                            data-current={number === step}
                                            data-complete={number < step}
                                            aria-label={`Step ${number}`}
                                            onClick={() => {
                                                if (number < step) {
                                                    goToStep(number);
                                                }
                                            }}
                                        >

                                            {number}

                                        </button>

                                    </li>

                                );

                            })}

                        </ol>

                        <div className={styles.panel}>

                            {stepContent()}

                        </div>

                        {submitError && (

                            <p className={styles.error}>{submitError}</p>

                        )}

                        <div className={styles.actions}>

                            <button
                                type="button"
                                className="btn transparent"
                                disabled={step === 1 || isSubmitting}
                                onClick={() => goToStep(step - 1)}
                            >

                                Back

                            </button>

                            <button type="submit" className="btn primary" disabled={isSubmitting}>

                                {step === totalSteps ? (isSubmitting ? "Sending" : "Submit application") : "Next"}

                            </button>

                        </div>

                        <p className={styles.note}>Submission confirms seriousness. We will not respond to speculative or incomplete applications.</p>

                    </form>

                )}

            </div>

        </section>

    );
}
