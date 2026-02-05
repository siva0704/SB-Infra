'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const text = textRef.current;
        if (!text) return;

        // Split text animation logic (simulated with opacity scrub for now)
        gsap.fromTo(text,
            { opacity: 0.2 },
            {
                opacity: 1,
                duration: 2,
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: true,
                }
            }
        );
    }, { scope: textRef });

    return (
        <section className="py-32 px-4 md:px-10 bg-luxe-black min-h-[50vh] flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
                <span className="text-luxe-gold font-mono text-sm tracking-widest uppercase mb-6 block">Who We Are</span>
                <p ref={textRef} className="font-serif text-3xl md:text-5xl leading-tight text-stone-100">
                    We are the architects of permanence. In a world of fleeting trends, we build spaces that stand the test of time. LuxeBuild bridges the gap between raw engineering reliability and exquisite luxury design.
                </p>
            </div>
        </section>
    );
}
