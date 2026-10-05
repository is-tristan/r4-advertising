"use client";

// Imports
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

// Styles
import styles from "./styles/number-counter.module.scss";

function toNumber(value) {

    if (typeof value === "number") {

        return value;

    }

    if (typeof value === "string") {

        return Number(value.replace(/,/g, ""));

    }

    return Number(value);

}

function getDecimalPlaces(value) {

    const number = toNumber(value);

    if (!Number.isFinite(number)) {

        return 0;

    }

    const decimals = String(value).split(".")[1];

    return decimals ? decimals.length : 0;

}

function formatValue(value, decimalPlaces) {

    return new Intl.NumberFormat("en-GB", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    }).format(value);

}

export default function NumberCounter({
    color = null,
    prefix = null,
    suffix = null,
    start = 0,
    end = 0,
    duration = 2,
    description = null,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const decimalPlaces = getDecimalPlaces(end);
    const startValue = toNumber(start);
    const safeStart = Number.isFinite(startValue) ? startValue : 0;
    const [value, setValue] = useState(safeStart);

    useEffect(() => {

        if (!isInView) {

            setValue(safeStart);

            return;

        }

        const endValue = toNumber(end);
        const safeEnd = Number.isFinite(endValue) ? endValue : safeStart;
        const safeDuration = toNumber(duration);

        if (!Number.isFinite(safeDuration) || safeDuration <= 0) {

            setValue(safeEnd);

            return;

        }

        const controls = animate(safeStart, safeEnd, {
            duration: safeDuration,
            ease: "easeOut",
            onUpdate: (latest) => {

                setValue(latest);

            },
        });

        return () => {

            controls.stop();

        };

    }, [isInView, safeStart, end, duration]);

    return (

        <div ref={ref} className={styles.numberCounter}>

            <div className={`${styles.counter} ${color ? color : 'colorLight'}`}>

                {prefix && (
                    <span className={styles.counterPrefix}>{prefix}</span>
                )}

                <span className={styles.counterValue}>{formatValue(value, decimalPlaces)}</span>

                {suffix && (
                    <span className={styles.counterSuffix}>{suffix}</span>
                )}

            </div>

            {description && (

                <span className={styles.description}>{description}</span>

            )}

        </div>

    );

}
