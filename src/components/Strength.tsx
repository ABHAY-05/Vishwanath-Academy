"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, Trophy, Users } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Students Enrolled", value: 2500, suffix: "+", icon: Users },
  { label: "Distinct Branches", value: 2, suffix: "", icon: Building2 },
  { label: "Result Success", value: 100, suffix: "%", icon: Trophy },
  { label: "Years of Excellence", value: 15, suffix: "+", icon: Calendar },
];

export default function OurStrength() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-primary py-16 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl mb-3 text-white font-display font-semibold">
            Our Strength
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto font-body text-lg">
            Empowering Minds, Building Futures: Educating the Leaders of
            Tomorrow.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-3 rounded-full bg-secondary/20 text-secondary group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      separator=","
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <p className="text-sm font-medium tracking-wider text-blue-100 uppercase opacity-80">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
