"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function LenisScrollToTop({
    immediate = true,
    offset = 0,
    force = true,
}) {

    const pathname = usePathname();
    const lenis = useLenis();
    const isFirstRender = useRef(true);

    useEffect(() => {

        if (isFirstRender.current) {

            isFirstRender.current = false;

            return;

        }

        if (lenis) {

            lenis.scrollTo(0, {
                immediate,
                offset,
                force,
            });

            return;

        }

        window.scrollTo(0, 0);

    }, [pathname, lenis, immediate, offset, force]);

    return null;

}
