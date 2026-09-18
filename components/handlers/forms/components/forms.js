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

                <legend className="legend">First Name <span className="required">*</span></legend>

                <div className="field">

                    <input type="text" name="firstName" required autoComplete="given-name" placeholder="Enter your first name" aria-required="true" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="lastName">

                <legend className="legend">Last Name <span className="required">*</span></legend>

                <div className="field">

                    <input type="text" name="lastName" required autoComplete="family-name" placeholder="Enter your last name" aria-required="true" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="email">

                <legend className="legend">Email Address <span className="required">*</span></legend>

                <div className="field">

                    <input type="email" name="email" required autoComplete="email" placeholder="Enter your email address" aria-required="true" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="mobileNumber">

                <legend className="legend">Mobile Number <span className="required">*</span></legend>

                <div className="field">

                    <input type="tel" name="mobileNumber" required autoComplete="tel" placeholder="+44 7XXX XXXXXX" aria-required="true" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="landlineNumber">

                <legend className="legend">Landline Number</legend>

                <div className="field">

                    <input type="tel" name="landlineNumber" autoComplete="tel" placeholder="+44 XX XXXX XXXX" />

                </div>

            </fieldset>

            <fieldset className="fieldset half" data-name="company">

                <legend className="legend">Company</legend>

                <div className="field">

                    <input type="text" name="company" autoComplete="organization" placeholder="Enter your company name" />

                </div>

            </fieldset>

            <fieldset className="fieldset" data-name="website">

                <legend className="legend">Website</legend>

                <div className="field">

                    <input type="url" name="website" autoComplete="url" placeholder="Enter your website URL" />

                </div>

            </fieldset>

            <fieldset className="fieldset" data-name="message">

                <legend className="legend">Message <span className="required">*</span></legend>

                <div className="field">

                    <textarea name="message" required autoComplete="off" placeholder="Enter your message..." aria-required="true" />

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

                <div className="resultContainer" style={{ display: result ? "flex" : "none" }}>

                    <span>{result}</span>

                </div>

            </div>

        </form>

    );

}