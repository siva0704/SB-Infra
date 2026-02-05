'use client';

import { ReactLenis } from 'lenis/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null);

    useGSAP(() => {
        // Just sync ScrollTrigger update on scroll, do not hijack RAF
        // This is safer to avoid locking.
        if (lenisRef.current?.lenis) {
            lenisRef.current.lenis.on('scroll', ScrollTrigger.update);
        }
    });

    return (
        <ReactLenis root ref={lenisRef} options={{ lerp: 0.1, wheelMultiplier: 1.2 }}>
            {children}
        </ReactLenis>
    );
}
