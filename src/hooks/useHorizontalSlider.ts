"use client";

import { useCallback, useRef } from "react";

export function useHorizontalSlider() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const currentIndexRef = useRef(0);

    const moveToIndex = useCallback((index: number) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const items = slider.querySelectorAll<HTMLElement>("[data-slider-item]");
        if (items.length === 0) return;

        const nextIndex = Math.max(0, Math.min(index, items.length - 1));
        currentIndexRef.current = nextIndex;
        items[nextIndex].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
    }, []);

    const movePrevious = useCallback(() => {
        moveToIndex(currentIndexRef.current - 1);
    }, [moveToIndex]);

    const moveNext = useCallback(() => {
        moveToIndex(currentIndexRef.current + 1);
    }, [moveToIndex]);

    const syncCurrentIndex = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const items = slider.querySelectorAll<HTMLElement>("[data-slider-item]");
        if (items.length === 0) {
            currentIndexRef.current = 0;
            return;
        }

        const isRtl = getComputedStyle(slider).direction === "rtl";
        const leadingEdge = isRtl
            ? slider.getBoundingClientRect().right
            : slider.getBoundingClientRect().left;

        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;
        items.forEach((item, index) => {
            const bounds = item.getBoundingClientRect();
            const itemLeadingEdge = isRtl ? bounds.right : bounds.left;
            const distance = Math.abs(itemLeadingEdge - leadingEdge);
            if (distance < closestDistance) {
                closestIndex = index;
                closestDistance = distance;
            }
        });

        currentIndexRef.current = closestIndex;
    }, []);

    return { sliderRef, movePrevious, moveNext, syncCurrentIndex };
}
