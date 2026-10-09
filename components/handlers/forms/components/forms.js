"use client";

// React
import { useState } from "react";

// Icons
import { arrowUpRight } from "@/utils/icons";

export default function ContactForm() {

    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(Object.fromEntries(formData.entries()));
        setResult("Your message has been sent successfully! We will get back to you as soon as possible.");
        event.target.reset();
    };

    return (

        <form className="form" onSubmit={onSubmit}>

            <fieldset className="fieldset half" data-name="firstName">

                <label className="legend" htmlFor="firstName">First Name <span className="required">*</span></label>

                <div className="field">

                    <input id="firstName" type="text" name="firstName" required autoComplete="given-name" placeholder="Enter your first name" aria-required="true" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="lastName">

                <label className="legend" htmlFor="lastName">Last Name <span className="required">*</span></label>

                <div className="field">

                    <input id="lastName" type="text" name="lastName" required autoComplete="family-name" placeholder="Enter your last name" aria-required="true" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="email">

                <label className="legend" htmlFor="email">Email Address <span className="required">*</span></label>

                <div className="field">

                    <input id="email" type="email" name="email" required autoComplete="email" placeholder="Enter your email address" aria-required="true" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="mobileNumber">

                <label className="legend" htmlFor="mobileNumber">Mobile Number <span className="required">*</span></label>

                <div className="field">

                    <input id="mobileNumber" type="tel" name="mobileNumber" required autoComplete="tel" placeholder="+44 7XXX XXXXXX" aria-required="true" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="landlineNumber">

                <label className="legend" htmlFor="landlineNumber">Landline Number</label>

                <div className="field">

                    <input id="landlineNumber" type="tel" name="landlineNumber" autoComplete="tel" placeholder="+44 XX XXXX XXXX" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="company">

                <label className="legend" htmlFor="company">Company</label>

                <div className="field">

                    <input id="company" type="text" name="company" autoComplete="organization" placeholder="Enter your company name" />

                </div>

            </fieldset>

            <fieldset className="fieldset" data-name="website">

                <label className="legend" htmlFor="website">Website</label>

                <div className="field">

                    <input id="website" type="url" name="website" autoComplete="url" placeholder="Enter your website URL" />

                </div>

            </fieldset>

            <fieldset className="fieldset" data-name="message">

                <label className="legend" htmlFor="message">Message <span className="required">*</span></label>

                <div className="field">

                    <textarea id="message" name="message" required autoComplete="off" placeholder="Enter your message..." aria-required="true" />

                </div>

            </fieldset>

            <fieldset className="fieldset consent" data-name="consent">

                <legend className="legend">Consent</legend>

                <div className="field">

                    <input type="checkbox" name="whatsappMarketing" id="whatsapp-marketing" />

                    <label htmlFor="whatsapp-marketing">

                        <div className="fieldConsetContent">

                            <p><strong>Yes, keep me updated on WhatsApp.</strong></p>

                            <p>Send me occasional media insights, trading opportunities, rate movements and availability from R4. I can reply STOP at any time.</p>

                        </div>
                    </label>

                </div>

            </fieldset>

            <div className="formFooter">

                <button className="btn primary" type="submit">

                    <span>Start the Conversation</span>

                    <div className="icon" dangerouslySetInnerHTML={{ __html: arrowUpRight }} />

                </button>

                <div className="resultContainer" role="status" aria-live="polite" style={{ display: result ? "flex" : "none" }}>

                    <span>{result}</span>

                </div>

            </div>

        </form>

    );

}