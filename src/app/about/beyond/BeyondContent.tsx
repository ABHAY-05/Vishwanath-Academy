"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { aboutData } from "@/data/about-data";

// Slider Images
const { sportsImages, balancingImage, digitalImage, motivationalImage } =
  aboutData.beyondClassroom;

export default function LearningBeyondClassroom() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLightboxIndex((prev) => (prev + 1) % sportsImages.length);
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLightboxIndex(
      (prev) => (prev - 1 + sportsImages.length) % sportsImages.length
    );
  };

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[250px] md:h-[300px] flex items-center justify-center bg-[#FDF6E4] dark:bg-[#2A1B3D]">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-3 rounded-full shadow-sm"
          >
            Learning Beyond Classroom
          </motion.h1>
        </div>
      </section>

      <div className="mx-auto max-w-[90%] xl:max-w-[1400px] px-4 md:px-6 relative z-10 py-16 space-y-24">
        {/* SECTION 1: Balancing Body, Mind & Soul */}
        <section>
          <div className="flex justify-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white bg-primary px-10 py-3 rounded-full shadow-lg">
              Balancing Body, Mind & Soul
            </h2>
          </div>

          <div className="flex flex-col xl:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full xl:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
            >
              <Image
                src={balancingImage}
                alt="Balancing Body, Mind & Soul"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <div className="w-full xl:w-1/2 space-y-6 text-justify text-gray-700 dark:text-gray-300 font-body leading-relaxed text-lg">
              <p>
                Taking care of our body is a responsibility, as it's the key to
                keeping the lamp of wisdom glowing and young minds strong and
                clear. At Vishwanath Academy, we believe in the essential
                balance between physical health and mental development. We work
                diligently to ensure this harmony, incorporating various sports
                and games into our school activities to promote the fitness of
                our students. A fresh and active mind, in turn, enhances
                openness and alertness.
              </p>
              <p>
                Our goal at Vishwanath Academy is to prepare students for future
                challenges while safeguarding their childhood from the pressures
                of today's competitive world. To foster the full development of
                a child's personality, we place significant emphasis on both
                intra-mural and extra-curricular activities. These activities
                not only challenge the physical abilities of our learners but
                also stimulate their mental capacities.
              </p>
              <p>
                We believe that through engaging the mind in meaningful field
                trips and excursions, we can inspire creativity and imagination.
                This, combined with physical well-being, ensures the agility and
                activeness of our learners.
              </p>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

        {/* SECTION 2: Use of Digital Technology */}
        <section>
          <div className="flex justify-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white bg-primary px-10 py-3 rounded-full shadow-lg">
              Use of digital technology
            </h2>
          </div>

          <div className="flex flex-col xl:flex-row-reverse items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full xl:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
            >
              <Image
                src={digitalImage}
                alt="Use of Digital Technology"
                fill
                sizes="(max-width: 1280px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <div className="w-full xl:w-1/2 space-y-6 text-justify text-gray-700 dark:text-gray-300 font-body leading-relaxed text-lg">
              <p>
                Digital learning encompasses instructional practices that
                leverage technology to enhance a student's learning experience,
                emphasizing high-quality instruction, access to challenging
                content, formative assessment feedback, and personalized
                learning to help each student reach their full potential.
              </p>
              <p>
                At Vishwanath Academy, we firmly believe in the synergy of
                technology and teaching; one complements the other. In addition
                to traditional teaching methods, our school is equipped with
                smart classes. E-learning, or smart class education, enhances
                visual learning, making it a valuable asset for 21st-century
                students. Smart classes employ interactive modules like videos
                and presentations, engaging students in a visually appealing
                manner.
              </p>
              <p>
                Our school features two advanced computer labs where students
                across all classes engage in computer-aided learning. Each lab
                is equipped with 35 personal computers, multimedia kits,
                printers, scanners, overhead projectors, and broadband internet
                connectivity. Regular visits to the computer labs are mandatory
                for all classes, allowing students to practice lessons, gain a
                better understanding, and develop computer skills. Two dedicated
                teachers, along with lab assistants, facilitate computer science
                education, and approximately 40 faculty members at our academy
                are well-trained in computer usage.
              </p>
              <p>
                Beyond computer science, our school embraces various
                technologies. A state-of-the-art ERP software, Quick-School,
                aids in school management programs. Our computer networking
                system enables efficient communication, utilizing an SMS server
                to promptly convey important messages to parents. Additionally,
                we have implemented a biometric system for teacher attendance,
                streamlining the process for effective communication and
                record-keeping.
              </p>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

        {/* SECTION 3: Outdoor and Sports Activities (UPDATED SLIDER) */}
        <section>
          <div className="flex justify-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white bg-primary px-10 py-3 rounded-full shadow-lg">
              Outdoor and Sports Activities
            </h2>
          </div>

          {/* Swiper Slider */}
          <div className="mb-12">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="w-full pb-12" // Padding bottom for pagination dots
            >
              {sportsImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative w-full aspect-4/3 rounded-xl overflow-hidden cursor-pointer group shadow-lg border-2 border-transparent hover:border-primary transition-colors"
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={src}
                      alt={`Sports Activity ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="space-y-6 text-justify text-gray-700 dark:text-gray-300 font-body leading-relaxed text-lg">
            <p>
              At Vishwanath Academy, sports hold a place of utmost significance.
              We firmly believe that certain virtues integral to one's character
              are best cultivated when a student is actively involved in sports.
              These merits include team spirit, a 'never say no' attitude,
              profound respect for others, a fighter's mentality, active living,
              and physical fitness, to name a few. Therefore, our focus is on
              offering a well-coordinated and planned approach to high-quality
              sports.
            </p>
            <p>
              Our school boasts ample facilities for sports and games. The
              sports team organizes various competitions periodically, aiming to
              keep students physically fit and instill values such as healthy
              competition, team spirit, and camaraderie.
            </p>
            <p>
              With a playground spanning 60 meters, two Volleyball courts, and a
              dedicated room for Table Tennis, our sports facilities are
              well-equipped. All classes have a mandatory games period, and we
              are supported by two sports teachers (one male and one female)
              along with a Table Tennis coach.
            </p>
            <p>
              While our school encourages participation in all sports, we place
              special emphasis on Volleyball and Table Tennis. Our students have
              consistently brought pride to the institution by winning various
              competitions at local, state, and national levels. Notably, our
              students secured the Cluster '4' overall Championship in Table
              Tennis during the 2014-15 session and earned a Bronze Medal in the
              under-14 category (Boys) at the National Level.
            </p>
            <p>
              In addition to these achievements, our school places great
              importance on athletics and other sports such as Cricket and
              Football.
            </p>
          </div>
        </section>

        <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

        {/* SECTION 4: Motivational & Knowledge Sessions */}
        <section>
          <div className="flex justify-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white bg-primary px-10 py-3 rounded-full shadow-lg text-center leading-tight">
              Motivational & Knowledge Sessions by Industry Experts
            </h2>
          </div>

          <div className="flex flex-col items-center space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full aspect-21/9 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
            >
              <Image
                src={motivationalImage}
                alt="Motivational Session"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-6 text-justify text-gray-700 dark:text-gray-300 font-body leading-relaxed text-lg">
              <p>
                Motivational counseling is a short, evidence-based counseling
                approach employed to minimize risky behavior in both adults and
                adolescents. Recently, these counseling sessions have been
                integrated into school settings to enhance positive student
                outcomes, such as improved academic behavior and mental health.
                This involves assessing the effectiveness of training lay
                providers in utilizing these counseling sessions to boost
                academic achievements among young individuals.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
            >
              <X size={48} />
            </button>

            <div
              className="relative w-full max-w-6xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full rounded-lg overflow-hidden"
                >
                  <Image
                    src={sportsImages[currentLightboxIndex]}
                    alt={`Fullscreen Image ${currentLightboxIndex + 1}`}
                    fill
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="object-contain"
                    priority
                    quality={100}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <ChevronRight size={40} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-6 py-2 rounded-full text-base font-medium">
                {currentLightboxIndex + 1} / {sportsImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
