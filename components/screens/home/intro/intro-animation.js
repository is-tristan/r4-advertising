"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

import styles from "./styles/intro-animation.module.scss";

const storageKey = "r4IntroPlayed";
const animationPath = "/decoration/intro/intro-animation.json";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const fallbackDuration = 8000;

const skipScript = `try{if(sessionStorage.getItem("${storageKey}")==="true"||window.matchMedia("${reducedMotionQuery}").matches){document.getElementById("introAnimation").style.display="none"}}catch(e){}`;

function shouldSkipIntro() {

    try {

        return sessionStorage.getItem(storageKey) === "true" || window.matchMedia(reducedMotionQuery).matches;

    } catch {

        return false;

    }

}

function markIntroPlayed() {

    try {

        sessionStorage.setItem(storageKey, "true");

    } catch {

        return;

    }

}

export default function IntroAnimation() {

    const [status, setStatus] = useState("playing");
    const playerRef = useRef(null);
    const animationRef = useRef(null);
    const lenis = useLenis();

    useLayoutEffect(() => {

        if (shouldSkipIntro()) {

            setStatus("done");

        }

    }, []);

    useEffect(() => {

        if (shouldSkipIntro()) {

            return;

        }

        let isCancelled = false;
        let hasLeft = false;

        const leave = () => {

            if (isCancelled || hasLeft) {

                return;

            }

            hasLeft = true;
            window.clearTimeout(fallbackTimer);
            markIntroPlayed();
            setStatus("leaving");

        };

        const fallbackTimer = window.setTimeout(leave, fallbackDuration);

        Promise.all([
            import("lottie-web/build/player/esm/lottie_light.min.js"),
            fetch(animationPath).then((response) => response.json()),
        ])
            .then(([{ default: lottie }, animationData]) => {

                if (isCancelled || !playerRef.current) {

                    return;

                }

                const animation = lottie.loadAnimation({
                    container: playerRef.current,
                    renderer: "svg",
                    loop: false,
                    autoplay: true,
                    animationData,
                });

                animation.addEventListener("complete", leave);
                animationRef.current = animation;

            })
            .catch(leave);

        return () => {

            isCancelled = true;
            window.clearTimeout(fallbackTimer);
            animationRef.current?.destroy();
            animationRef.current = null;

        };

    }, []);

    useEffect(() => {

        if (!lenis || status !== "playing") {

            return;

        }

        lenis.stop();

        return () => {

            lenis.start();

        };

    }, [lenis, status]);

    const handleTransitionEnd = (event) => {

        if (event.target !== event.currentTarget || event.propertyName !== "opacity") {

            return;

        }

        animationRef.current?.destroy();
        animationRef.current = null;
        setStatus("done");

    };

    if (status === "done") {

        return null;

    }

    return (

        <>

            <div
                id="introAnimation"
                className={`${styles.introAnimation} ${status === "leaving" ? styles.isLeaving : ""}`}
                aria-hidden="true"
                onTransitionEnd={handleTransitionEnd}
                suppressHydrationWarning
            >

                <div ref={playerRef} className={styles.introAnimationPlayer} />

            </div>

            <script
                type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: skipScript }}
            />

        </>

    );

}
