"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {

    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {

        const media = window.matchMedia("(prefers-reduced-motion: reduce)");

        const update = () => {
            setReducedMotion(media.matches);
        };

        update();
        media.addEventListener("change", update);

        return () => {
            media.removeEventListener("change", update);
        };

    }, []);

    return (

        <ReactLenis
            root
            options={{
                smoothWheel: !reducedMotion,
                syncTouch: false,
                stopInertiaOnNavigate: true,
            }}
        >

            {children}

        </ReactLenis>

    );

}
