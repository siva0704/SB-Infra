'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Parallax effect for the background text or simple fade in
        const elements = gsap.utils.toArray('.vm-card');
        elements.forEach((el: any, index) => {
            gsap.from(el, {
                y: 100,
                opacity: 0,
                duration: 1,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-4 md:px-10 bg-stone-900 overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

                {/* Vision */}
                <div className="vm-card flex flex-col gap-6">
                    <h3 className="font-serif text-4xl md:text-5xl text-luxe-gold">Our Vision</h3>
                    <p className="text-stone-400 text-lg leading-relaxed">
                        To redefine the skyline with structures that embody elegance and resilience. We envision a future where every building is not just a shelter, but a legacy passed down through generations.
                    </p>
                </div>

                {/* Mission */}
                <div className="vm-card flex flex-col gap-6">
                    <h3 className="font-serif text-4xl md:text-5xl text-luxe-gold">Our Mission</h3>
                    <p className="text-stone-400 text-lg leading-relaxed">
                        To deliver transparent, high-precision construction services that honor the architect's vision and the client's dream. We commit to zero-compromise quality, from the first soil test to the final handover.
                    </p>
                </div>

            </div>
        </section>
    );
}
