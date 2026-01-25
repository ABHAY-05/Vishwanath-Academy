"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Clock, Globe } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/site-config";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { branches } = siteConfig;

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative h-[300px] flex items-center justify-center bg-blue-50 dark:bg-gray-900">
        <div className="text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-3 rounded-full shadow-sm"
          >
            Contact <span className="text-secondary">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 dark:text-gray-300 font-body text-lg"
          >
            We'd love to hear from you. Reach out to us.
          </motion.p>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 -mt-10 relative z-10 space-y-20">
        {/* 2. CAMPUS DETAILS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aashiana Campus */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-t-4 border-primary overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <span className="p-2 bg-primary/10 rounded-lg text-primary">
                  <MapPin size={24} />
                </span>
                {branches.aashiana.name}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-body">
                  <MapPin className="shrink-0 mt-1 text-primary" size={20} />
                  <p>{branches.aashiana.address}</p>
                </div>
                <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-body">
                  <Phone className="shrink-0 mt-1 text-primary" size={20} />
                  <div className="space-y-1">
                    {branches.aashiana.phone.map((ph, i) => (
                      <a
                        key={i}
                        href={`tel:${ph.replace(/\D/g, "")}`}
                        className="block hover:text-primary transition-colors"
                      >
                        {ph}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-body">
                  <Mail className="shrink-0 mt-1 text-primary" size={20} />
                  <a
                    href={`mailto:${branches.aashiana.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {branches.aashiana.email}
                  </a>
                </div>
                <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-body">
                  <Clock className="shrink-0 mt-1 text-primary" size={20} />
                  <p>Mon - Sat: 8:00 AM - 4:00 PM</p>
                </div>
              </div>

              {/* Map Embed - Aashiana */}
              <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-inner border border-gray-100 dark:border-gray-800 bg-gray-100">
                <iframe
                  src={branches.aashiana.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Dhawapur Campus */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-t-4 border-secondary overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <span className="p-2 bg-secondary/10 rounded-lg text-secondary-dark">
                  <MapPin size={24} />
                </span>
                {branches.dhawapur.name}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-body">
                  <MapPin
                    className="shrink-0 mt-1 text-secondary-dark"
                    size={20}
                  />
                  <p>{branches.dhawapur.address}</p>
                </div>
                <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-body">
                  <Phone
                    className="shrink-0 mt-1 text-secondary-dark"
                    size={20}
                  />
                  <div className="space-y-1">
                    {branches.dhawapur.phone.map((ph, i) => (
                      <a
                        key={i}
                        href={`tel:${ph.replace(/\D/g, "")}`}
                        className="block hover:text-secondary-dark transition-colors"
                      >
                        {ph}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-body">
                  <Mail
                    className="shrink-0 mt-1 text-secondary-dark"
                    size={20}
                  />
                  <a
                    href={`mailto:${branches.dhawapur.email}`}
                    className="hover:text-secondary-dark transition-colors"
                  >
                    {branches.dhawapur.email}
                  </a>
                </div>
                <div className="flex items-start gap-4 text-gray-600 dark:text-gray-300 font-body">
                  <Clock
                    className="shrink-0 mt-1 text-secondary-dark"
                    size={20}
                  />
                  <p>Mon - Sat: 8:00 AM - 4:00 PM</p>
                </div>
              </div>

              {/* Map Embed - Dhawapur */}
              <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-inner border border-gray-100 dark:border-gray-800 bg-gray-100">
                <iframe
                  src={branches.dhawapur.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. CONTACT FORM SECTION */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Form Side */}
            <div className="lg:col-span-3 p-8 md:p-12 order-2 lg:order-1">
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-400 font-body">
                  Have a query? Fill out the form below and we'll get back to
                  you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="Admission Enquiry"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`
                                w-full md:w-auto px-8 py-3 rounded-lg font-bold text-white transition-all transform hover:scale-105 flex items-center justify-center gap-2
                                ${
                                  isSubmitted
                                    ? "bg-green-600"
                                    : "bg-primary hover:bg-primary-dark"
                                }
                                ${
                                  isSubmitting
                                    ? "opacity-70 cursor-not-allowed"
                                    : ""
                                }
                            `}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : isSubmitted ? (
                    "Message Sent!"
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Decoration Side */}
            <div className="bg-primary lg:col-span-2 p-12 text-white flex flex-col justify-center relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 opacity-10 pattern-dots"></div>
              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">
                    Join Our Team
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Are you passionate about education? We are always looking
                    for talented individuals to join our family.
                  </p>
                </div>
                <a
                  href="/contact/career"
                  className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  View Career Opportunities
                </a>

                <div className="pt-8 border-t border-white/20">
                  <h3 className="text-2xl font-display font-bold mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex gap-4">
                    {/* Social Icons - Using simple placeholders for now as we don't import them all */}
                    <a
                      href="https://www.facebook.com/vna.aashiana"
                      target="_blank"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Globe size={20} />
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-white/70">
                    Follow us on social media for daily updates and news.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
