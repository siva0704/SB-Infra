'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const phases = [
    {
        title: "Phase 1: Pre-Design",
        steps: [
            { id: 1, title: "Architect Assignment", icon: "👷" },
            { id: 2, title: "Digital Survey", icon: "📐" },
            { id: 3, title: "Soil Test", icon: "🌱" },
        ]
    },
    {
        title: "Phase 2: Design",
        steps: [
            { id: 4, title: "2D Floor Plan", icon: "📝" },
            { id: 5, title: "Structural Design", icon: "🏗️" },
            { id: 6, title: "Final Quotation", icon: "💰" },
            { id: 7, title: "Elevation Design", icon: "🏠" },
        ]
    },
    {
        title: "Phase 3: Planning",
        steps: [
            { id: 8, title: "Contract, Schedule and Signing", icon: "✍️" },
            { id: 9, title: "Construction Partner Allocation", icon: "🤝" },
            { id: 10, title: "Project Manager Assignment", icon: "👨‍💼" },
        ]
    },
    {
        title: "Phase 4: Execution",
        steps: [
            { id: 11, title: "Project Site Verification", icon: "✅" },
            { id: 12, title: "Quality Checks & Inspections", icon: "🔍", highlight: true },
            { id: 13, title: "Project Handover", icon: "🔑" },
        ]
    }
];

export default function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        // Line drawing animation
        // We animate the strokeDashoffset from 1 to 0 based on scroll
        // Since we don't have DrawSVG, we use standard css/gsap logic
        const totalHeight = container.scrollHeight;

        gsap.fromTo(lineRef.current,
            { strokeDasharray: totalHeight, strokeDashoffset: totalHeight },
            {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                }
            }
        );

        // Phase pinning and step animations
        const phaseElements = gsap.utils.toArray('.process-phase') as HTMLElement[];

        phaseElements.forEach((phase) => {
            // Pin the title logic is tricky within a growing container. 
            // Instead of native pin, we might let them stick via sticky css or manual calculation.
            // Given the requirement: "Phase Title should pin"
            // Simplest robust way is CSS sticky for the title within the phase section.

            const steps = phase.querySelectorAll('.process-step');

            steps.forEach((step) => {
                gsap.fromTo(step,
                    {
                        y: 50,
                        opacity: 0,
                        filter: 'blur(10px)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: step,
                            start: "top 80%",
                            end: "top 50%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-[200vh] py-40 px-4 md:px-10 bg-stone-900 border-t border-stone-800">

            {/* Central Line SVG */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px -ml-px pointer-events-none z-0">
                <svg className="w-full h-full text-stone-700" preserveAspectRatio="none">
                    <path
                        ref={lineRef}
                        d="M0,0 V99999" /* Very long path, will need to be clipped or handled via JS height */
                    /* Better approach: Just use a highly scaled rect or line in a fixed container? No, logic needs to track scroll. */
                    /* Let's try a simple div that grows instead of complex SVG for reliability if height is dynamic */
                    />
                    {/* Re-attempting SVG approach with dynamic height is hard in SSR. 
              Let's use a DIV with animated height for the line. It's safer.
          */}
                </svg>
                {/* Fallback to Div Line for robustness */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-stone-800 h-full"></div>
                <div className="line-fill absolute top-0 left-0 w-0.5 bg-luxe-gold h-[0%] transition-none"></div>
                {/* We will animate 'line-fill' height instead of SVG stroke for simplicity in this implementation */}
            </div>

            <style jsx>{`
        .line-fill {
           /* This will be animated by GSAP */
        }
      `}</style>

            <div className="max-w-5xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif text-stone-400 mb-20 text-center">Our Process</h2>

                {phases.map((phase, pIndex) => (
                    <div key={pIndex} className="process-phase relative mb-32 grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Phase Title - Sticky */}
                        <div className={`md:sticky md:top-32 h-fit text-right md:pr-20 py-10 ${pIndex % 2 !== 0 ? 'md:order-2 md:text-left md:pl-20 md:pr-0' : ''}`}>
                            <h3 className="text-2xl md:text-4xl font-serif text-luxe-gold">{phase.title}</h3>
                        </div>

                        {/* Steps Container */}
                        <div className={`space-y-12 ${pIndex % 2 !== 0 ? 'md:order-1 md:text-right md:pr-20' : 'md:pl-20'}`}>
                            {phase.steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={clsx(
                                        "process-step relative p-6 border border-stone-800 bg-stone-900/50 backdrop-blur-sm rounded-lg hover:border-luxe-gold/50 transition-colors duration-500",
                                        step.highlight && "animate-pulse border-luxe-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                    )}
                                >
                                    <div className={`absolute top-1/2 ${pIndex % 2 !== 0 ? '-right-[81px]' : '-left-[81px]'} w-20 h-px bg-stone-800 hidden md:block`} />

                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="text-2xl">{step.icon}</span>
                                        <span className="font-mono text-xs text-stone-500">Step {step.id < 10 ? `0${step.id}` : step.id}</span>
                                    </div>
                                    <h4 className="text-xl text-stone-200">{step.title}</h4>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
