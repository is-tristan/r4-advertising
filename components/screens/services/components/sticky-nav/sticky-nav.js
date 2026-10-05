"use client";

// Next
import Link from "next/link";

// React
import { useEffect, useRef, useState } from "react";

// Styles
import styles from "./styles/sticky-nav.module.scss";

const sectionIds = ["trade", "plan", "activate"];

const separatorRanges = [
    ["trade", "plan"],
    ["plan", "activate"],
];

function getHeaderOffset() {

    const header = document.getElementById("header");

    if (!header) {
        return 0;
    }

    return header.getBoundingClientRect().height;

}

function getRangeProgress(fromId, toId, marker) {

    const fromSection = document.getElementById(fromId);
    const toSection = document.getElementById(toId);

    if (!fromSection || !toSection) {

        return 0;

    }

    const scrollY = window.scrollY;
    const fromY = fromSection.getBoundingClientRect().top + scrollY;
    const toY = toSection.getBoundingClientRect().top + scrollY;
    const current = scrollY + marker;
    const distance = toY - fromY;

    if (distance <= 0) {

        return current >= toY ? 1 : 0;

    }

    return Math.min(1, Math.max(0, (current - fromY) / distance));

}

export default function StickyNav() {

    const sentinelRef = useRef(null);
    const navRef = useRef(null);
    const separatorRefs = useRef([]);
    const [isSticky, setIsSticky] = useState(false);
    const [activeId, setActiveId] = useState("");
    const [navHeight, setNavHeight] = useState(0);
    const [headerOffset, setHeaderOffset] = useState(0);

    useEffect(() => {

        const nav = navRef.current;

        if (!nav) {

            return;

        }

        const updateHeight = () => {

            setNavHeight(nav.offsetHeight);

        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);

        resizeObserver.observe(nav);

        const update = () => {

            const sentinel = sentinelRef.current;
            const currentHeaderOffset = getHeaderOffset();
            const marker = currentHeaderOffset + nav.offsetHeight;

            setHeaderOffset(currentHeaderOffset);

            if (sentinel) {

                setIsSticky(sentinel.getBoundingClientRect().top <= currentHeaderOffset);

            }

            let nextActiveId = "";

            sectionIds.forEach((id) => {

                const section = document.getElementById(id);

                if (!section) {

                    return;

                }

                section.style.scrollMarginTop = `${marker}px`;

                if (section.getBoundingClientRect().top <= marker) {

                    nextActiveId = id;

                }

            });

            setActiveId(nextActiveId);

            separatorRefs.current.forEach((separator, index) => {

                if (!separator) {

                    return;

                }

                const [fromId, toId] = separatorRanges[index];
                const progress = getRangeProgress(fromId, toId, marker);

                separator.style.transform = `scaleX(${progress})`;

            });

        };

        update();

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {

            resizeObserver.disconnect();
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);

        };

    }, []);

    const isActive = (id) => activeId === id;

    return (

        <div
            ref={sentinelRef}
            className={styles.stickyNavSentinel}
            style={isSticky ? { height: navHeight } : undefined}
        >

            <div
                ref={navRef}
                className={`${styles.stickyNav} borderBottom`}
                data-sticky={isSticky}
                style={isSticky ? { top: headerOffset } : undefined}
            >

                <div className={`container ${styles.stickyNavContainer}`}>

                    <Link className={styles.stickyNavLink} href="#trade" data-active={isActive("trade")}>Trade</Link>

                    <span className={styles.stickyNavSeperator}>

                        <span ref={(element) => { separatorRefs.current[0] = element; }} />

                    </span>

                    <Link className={styles.stickyNavLink} href="#plan" data-active={isActive("plan")}>Plan</Link>

                    <span className={styles.stickyNavSeperator}>

                        <span ref={(element) => { separatorRefs.current[1] = element; }} />

                    </span>

                    <Link className={styles.stickyNavLink} href="#activate" data-active={isActive("activate")}>Activate</Link>

                </div>

            </div>

        </div>

    );

}
