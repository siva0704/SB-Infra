'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const specialties = [
    { title: "Luxury Estates", desc: "Private residences built to perfection." },
    { title: "Commercial Landmarks", desc: "Offices that inspire productivity and awe." },
    { title: "Sustainable Living", desc: "Eco-conscious engineering meets premium design." },
    { title: "Restoration", desc: "Preserving history with modern reinforcement." },
];

export default function Specialties() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Horizontal scroll effect
        const slider = sliderRef.current;
        if (!slider) return;

        const totalWidth = slider.scrollWidth;
        const viewportWidth = window.innerWidth;

        gsap.to(slider, {
            x: -(totalWidth - viewportWidth + 100), // +100 padding
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                end: () => "+=" + slider.scrollWidth,
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen bg-stone-900 border-t border-stone-800 overflow-hidden flex flex-col justify-center z-10">
            <div className="px-10 mb-10">
                <h2 className="font-serif text-4xl md:text-6xl text-stone-300">Our Specialties</h2>
            </div>

            <div ref={sliderRef} className="flex gap-10 px-10 w-max">
                {specialties.map((item, index) => (
                    <div key={index} className="w-[80vw] md:w-[40vw] h-[50vh] bg-stone-800 border border-stone-700 p-10 flex flex-col justify-end hover:border-luxe-gold transition-colors duration-300">
                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">{item.title}</h3>
                        <p className="font-sans text-stone-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
