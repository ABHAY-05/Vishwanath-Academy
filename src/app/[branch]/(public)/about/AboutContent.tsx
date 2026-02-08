"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Quote, BookOpen, Target, Award, User } from "lucide-react"; // Import new icons

import { aboutData } from "@/data/about-data";

const quotes = aboutData.quotes;

const tabData = [
  {
    title: "Education for All",
    icon: BookOpen,
    content: (
      <div className="space-y-4 text-justify">
        <p>
          It is of utmost importance for all human beings to be educated but
          there are many who do not get the opportunity. With the dream of equal
          opportunity for all Mr. Markandey Tiwari established the Vishwanath
          Academy on the 24th April 2006, an English Medium, Co-educational
          school which is affiliated to CBSE under the umbrella of his brand The
          Vishwanath Group. The group endeavours in to Hotels and Educational
          Institutes. The school is registered under the Vishwanath Academy of
          Sciences - a society for Educational Institutes.
        </p>
        <p>
          The school, as the dream of Mr. Markandey Tiwari, is a symbol of
          equality. Apart from regular students Vishwanath Academy identifies
          deserving and good students who cannot afford to study in a good
          school. It then teaches them absolutely free of cost and goes even to
          the limit of sponsoring their basic needs like the school books and
          stationery.
        </p>
      </div>
    ),
  },
  {
    title: "Vision & Mission",
    icon: Target,
    content: (
      <div className="space-y-6 text-justify">
        <p>
          We at Vishwanath Academy, focus our dedication towards evoking a
          passion for learning and developing the requisite set of attitudes,
          skills and knowledge that enable our learners to maximize their
          potential towards becoming positive, responsible and well informed
          participants in our democratic and rapidly progressing global
          community. It is with this ambition that we work towards developing an
          environment which fosters social accountability, national pride and a
          curiosity to trigger the mood for self-learning through
          self-initiation.
        </p>
        <p>
          On this ethos rest the pillars of our foundation. Our MISSION
          statement therefore holds true when we say that:
        </p>
        <div className="bg-blue-50/50 dark:bg-gray-800/50 p-6 rounded-xl border border-blue-100 dark:border-gray-700">
          <blockquote className="border-l-4 border-primary pl-4 italic text-primary dark:text-secondary font-semibold text-lg">
            “We aspire to walk our learners down the road which leads them to
            develop, a thirst for knowledge such that its discovery leads to the
            enrichment of life for them as individuals and the community at
            large”
          </blockquote>
        </div>
        <p>
          It is through this mission that we wish to realise our VISION….
          <br />
          That of moulding our students into:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Academically Competent Persons",
            "Individuals with exemplary behavior",
            "Inquirers and investigators",
            "Logical and rational thinkers",
            "Responsible of social good",
            "Individuals with empathy",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <span className="w-2 h-2 rounded-full bg-secondary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    title: "The Edge\nAffiliated to CBSE!!",
    icon: Award,
    content: (
      <div className="space-y-6 text-justify">
        <p>
          CBSE, conducts two of the biggest competitive examinations - JEE for
          engineering and NEET for medical. These two exams allow students to
          compete for seats in the prestigious IITs, NITs, AIIMS and other
          institutions of national repute. Being affiliated to CBSE our students
          will one have the have the basic background required to crack these
          exams. CBSE syllabus is tough and students will have to work hard to
          get good results.
        </p>
        <p>
          CBSE curriculum is geared towards developing students' application
          skills and problem solving abilities. Once a particular concept is
          taught, students are tested on the concept using various
          methodologies. This helps students learn how to apply the concepts in
          various contexts. Since CBSE syllabus is very demanding, students will
          have no problem adjusting to the local education system in places such
          as North America, United Kingdom and Singapore, to name a few. In the
          long run CBSE students do very well in their professional lives as
          they have great logical skills and excellent problem solving abilities
          which will help them in all walks of their lives. No External Coaching
          Culture!!!
        </p>
        <p>
          Today we live in an age of extreme competition and ever demanding
          world. As parents we want our kids to speak fluent English & at least
          one extra foreign language and to be Einsteins & Edisons of the world
          from the very beginning. We gauge the success of our kids with their
          salary packages and the international locations they work at. For this
          we try to get them into the best of the colleges/universities in both
          India and Abroad. As a result there has been a blind race among
          parents after Coaching Institutes & Tuition Centers.
        </p>
        <p>
          The ever growing professional tuition/coaching culture today starts
          from as early as primary classes which today have also started to beat
          the very purpose of school teaching.
        </p>
        <p>
          We as an institution are extremely professional when it comes to
          education and very warm and caring when one meets us personally. Once
          a student is a part of the Vishwanath family, we take complete care of
          their needs related to teaching and guidance to an extent that he
          should not require any external coaching institute. In case they
          require special attention then we arrange for special & extra classes
          in the school itself. And this helps the students and parents in
          multiple problems:
        </p>
        <ul className="space-y-3">
          {[
            "Students usually do not get enough time for self-study (which is irreplaceable), irrespective of availability of best teachers to guide!",
            "Parents on the other hand have to bear an unwanted burden of extra expenditure on their children's coaching classes and travelling",
            "In a coaching institute scenario the kids are always running from home to school to home and then to coaching and again to home. This builds up tremendous pressure on them in such a young age and affects their mental & physical health adversely",
            "Financial pressure on parents is still bearable but health issues with young children cannot be tolerated and that too due to lack of time. As they say “All work and no play makes, Jack a dull boy!”",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-primary" />
              <span className="text-sm dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold text-primary dark:text-secondary mt-6 flex items-center gap-2">
          <span className="w-8 h-1 bg-secondary rounded-full" />
          Creating Complete Personalities
        </h3>
        <p>
          We believe that our students should not only be studious but also a
          brilliant human being. He should understand and imbibe the qualities
          of a leader and an effective team member. He should have a never to
          say “No…” and never to say “I can't…” attitude. He should be the owner
          of a strong mind and a strong body.
        </p>
        <p>
          Vishwanath Academy hosts & organises several competitions and
          festivals which help them imbibe these qualities. Apart from this we
          get professional sports training for our students and also train them
          in various skills like Dramatics/Theatre, Music & Dance, Elocution,
          Debates, etc.
        </p>
      </div>
    ),
  },
  {
    title: "Vna at a Glance",
    icon: Quote,
    content: (
      <div className="space-y-4 text-justify">
        <p>
          Vishwanath Academy nurtures academic excellence by teaching the
          curriculum creatively, holistically and to foster in students, the
          confidence they need to successfully meet the challenges the future
          will turn upon them.
        </p>
        <p>
          Rightly said by Cyril Taylor; “Good teaching and strong leadership
          from the head are the crucial ingredients.” The school believes in
          high quality teaching and strong leadership.
        </p>
        <blockquote className="border-l-4 border-secondary pl-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-r-lg">
          “Each human being strives to be fully known and affirmed for who they
          are and to contribute something significant to the human story,
          character starts with the adults,” said Kurtz that means core value
          commitments, modelling 360 degree evaluation and celebrations. Teacher
          wants most is time, trust and connections.
        </blockquote>
        <p>
          Teachers not only update their professional knowledge regularly and
          plan effective lessons, they also tend to be vibrant, enthusiastic and
          inventive. The teachers make themselves available to pupils outside
          lessons. The teachers don't just go extra mile; they go an extra three
          miles.
        </p>
        <p>
          The vision often translates into strong school ethos with high
          expectations that every pupil will work hard. So that, they become
          responsible for their own learning and to adopt an enquiring approach
          to their studies.
        </p>
        <ul className="grid gap-3">
          {[
            "The school follows a uniformly planned time-table for the faculty members, where each teacher gets sufficient amount of time to set and prepare the lessons effectively.",
            "The annual calendar has been planned along with the activities, examination schedule, parent-teachers meet schedules for the session and the forth coming holidays.",
            "It is a regular feature of the school. A trained Yoga teacher has been appointed to train its students in this skill.",
            "Value and peace education is imparted to the students regularly.",
            "Culture is incredibly important. We believe in mastering the culture on the daily basis.",
            "Students are sensitised to connect real world issues to regular curriculum from the class syllabus. Being a co-educational institute the school provides the equal opportunity to all students.",
            "Inter-house competitions are a regular feature in Vishwanath Academy, Hindi and English Debate, Elocution Contests, Creative Writing, Quiz, Dance, Dramatics, Sports and Games, Collage, Rangoli Making, etc. are conducted to take out hidden aptitude of children and to build confidence in them.",
            "Several functions like Annual Cultural Show, Annual Sports Day, Annual Fete, Annual Art and Craft Exhibition, Science Exhibitions are held in the school to provide platform to each student to showcase their talent.",
            "Not to forget the sensitive issues, the understanding of the environment amongst the students is a major concern in the school. Time to time tree plantation, cleanliness drive, workshops on hygiene are conducted.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-secondary font-bold text-lg leading-none">
                ›
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="bg-white dark:bg-gray-950 pb-20 overflow-hidden">
      {/* 1. HERO SECTION - Modern Gradient */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image/Pattern */}
        <div className="absolute inset-0 bg-blue-900 dark:bg-gray-900">
          <div className="absolute inset-0 opacity-20 bg-[url('/pattern-grid.svg')] bg-repeat" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-black/80 dark:from-black/90 dark:to-blue-950/50" />

          {/* Animated Blobs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl"
          />
        </div>

        <div className="text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              Discover the legacy of Vishwanath Academy, where we shape futures
              through holistic education and values.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 -mt-20 relative z-20">
        {/* 2. QUOTES GRID - Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {quotes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl border border-white/20 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              {/* Decorative Quote Icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 dark:text-white/5 rotate-180 group-hover:scale-110 transition-transform duration-500" />

              <div className="relative z-10">
                <p
                  className={`text-gray-800 dark:text-gray-100 text-xl font-medium leading-relaxed mb-6 ${
                    item.isSanskrit ? "italic font-serif" : ""
                  }`}
                >
                  "{item.text}"
                </p>
                {item.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg">
                      <User size={20} />
                    </div>
                    <div className="text-sm font-bold text-primary dark:text-secondary uppercase tracking-wider">
                      {item.author}
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* 3. MAIN CONTENT - Assymetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 z-10">
              <Image
                src="/VNA-About.jpg"
                alt="Students at Vishwanath Academy"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            {/* Decos */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute top-10 -right-4 w-24 h-24 bg-pattern-dots opacity-20 -z-10" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-gray-800 text-primary dark:text-secondary rounded-full text-sm font-bold mb-4 w-fit">
              Who We Are
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              About <br />
              <span className="text-primary dark:text-secondary">
                Vishwanath Academy
              </span>
            </h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300 font-body text-lg leading-relaxed text-justify">
              <p>
                A curious mind is one which takes the world by surprise.
                Surprise of understanding, surprise of great achievements and
                surprise of doing wonders. We at Vishwanath Academy understand
                that life is a continuous learning process and that education
                does not mean to learn everything as prescribed in the courses
                rather education means learning to learn.
              </p>
              <div className="bg-blue-50/50 dark:bg-gray-800/50 p-6 rounded-xl border-l-4 border-primary">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  "A school's real task is to make children capable to explore
                  and grow throughout their lives."
                </p>
              </div>
              <p>
                We nurture our students to make them grow in all aspects of
                life. They go beyond books and learn from their lives,
                experiences and the extremely positive energy that is felt as
                soon as one enters the school's campus.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Full width paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            The school lays immense significance to sports. It does not only
            keep the students active and physically fit but also inculcates
            strong values like team spirit and never to give-up attitude in
            them. Our school Vishwanath Academy draws strength from diverse
            backgrounds of a huge student base and teachers.
          </p>
        </motion.div>

        {/* 4. MODERN TABS SECTION */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Tab Navigation */}
          <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 sticky top-24">
            {tabData.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                            group flex items-center gap-4 px-6 py-4 rounded-xl text-left transition-all duration-300 border-2
                            ${
                              activeTab === index
                                ? "bg-white dark:bg-gray-800 border-primary shadow-lg scale-105 z-10"
                                : "bg-gray-50 dark:bg-gray-900 border-transparent hover:bg-white hover:shadow-md text-gray-500 dark:text-gray-400"
                            }
                        `}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${activeTab === index ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-500 group-hover:text-primary"}`}
                >
                  <tab.icon size={20} />
                </div>
                <span
                  className={`font-bold ${activeTab === index ? "text-gray-900 dark:text-white" : ""}`}
                >
                  {tab.title.split("\n")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden min-h-[500px]">
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                      {(() => {
                        const Icon = tabData[activeTab].icon;
                        return <Icon size={32} />;
                      })()}
                    </div>
                    <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white whitespace-pre-line">
                      {tabData[activeTab].title}
                    </h3>
                  </div>

                  <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {tabData[activeTab].content}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
