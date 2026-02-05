'use client';

import { motion } from 'framer-motion';

const services = [
    { title: "Structured Planning", id: 1 },
    { title: "Architectural Design", id: 2 },
    { title: "Consultancy", id: 3 },
    { title: "Construction", id: 4 },
];

export default function ServicesGrid() {
    return (
        <section className="py-32 px-4 md:px-10 w-full bg-stone-900 border-t border-stone-800">
            <h2 className="font-serif text-4xl md:text-6xl text-stone-400 mb-16 text-center">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-800 border border-stone-800">
                {services.map((service) => (
                    <div key={service.id} className="relative bg-stone-900 aspect-square p-10 flex items-end overflow-hidden group">
                        <motion.div
                            className="absolute inset-0 bg-stone-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={false}
                        />
                        {/* Visual Placeholder for Hover Liquid Effect - Simple Scale for now */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621360841012-3f8d3885b527?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 ease-in-out" />

                        <h3 className="relative z-10 font-serif text-3xl md:text-5xl text-stone-300 group-hover:text-white transition-colors duration-300">
                            {service.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
