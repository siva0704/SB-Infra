'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Split text logic simulated by manually masking lines or words if needed
        // For now, simple rise-up animation

        tl.from(textRef.current, {
            y: '100%',
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.5,
        })
            .from(subRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: 'power3.out',
            }, '-=1');

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center items-center px-4 md:px-10 overflow-hidden">
            <div className="overflow-hidden">
                <h1 ref={textRef} className="font-serif text-[12vw] leading-[0.9] text-center text-stone-100 mix-blend-difference">
                    Constructing <br /> Legacy
                </h1>
            </div>

            <div ref={subRef} className="absolute bottom-10 left-10 text-stone-400 text-sm md:text-base font-sans tracking-widest uppercase">
                05 Completed Projects <span className="mx-2">|</span> Ongoing Premium Developments
            </div>
        </section>
    );
}
