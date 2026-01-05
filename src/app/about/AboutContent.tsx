"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { aboutData } from "@/data/about-data";

// Quotes Data
const quotes = aboutData.quotes;

// Tabs Data
const tabData = [
  {
    title: "Education for All",
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
        <blockquote className="border-l-4 border-primary pl-4 italic text-primary font-semibold">
          “We aspire to walk our learners down the road which leads them to
          develop, a thirst for knowledge such that its discovery leads to the
          enrichment of life for them as individuals and the community at large”
        </blockquote>
        <p>
          It is through this mission that we wish to realise our VISION….
          <br />
          That of moulding our students into:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Academically Competent Persons</li>
          <li>Individuals with exemplary behavior</li>
          <li>Inquirers and investigators</li>
          <li>Logical and rational thinkers</li>
          <li>Responsible of social and environmental goodwill</li>
          <li>Individuals with empathy towards one and all</li>
        </ul>
      </div>
    ),
  },
  {
    title: "The Edge\nAffiliated to CBSE!!",
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
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Students usually do not get enough time for self-study (which is
            irreplaceable), irrespective of availability of best teachers to
            guide!
          </li>
          <li>
            Parents on the other hand have to bear an unwanted burden of extra
            expenditure on their children's coaching classes and travelling
          </li>
          <li>
            In a coaching institute scenario the kids are always running from
            home to school to home and then to coaching and again to home. This
            builds up tremendous pressure on them in such a young age and
            affects their mental & physical health adversely
          </li>
          <li>
            Financial pressure on parents is still bearable but health issues
            with young children cannot be tolerated and that too due to lack of
            time. As they say “All work and no play makes, Jack a dull boy!”
          </li>
        </ul>
        <h3 className="text-xl font-bold text-primary mt-4">
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
        <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 dark:text-gray-400">
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
        <ul className="list-disc pl-5 space-y-2">
          <li>
            The school follows a uniformly planned time-table for the faculty
            members, where each teacher gets sufficient amount of time to set
            and prepare the lessons effectively.
          </li>
          <li>
            The annual calendar has been planned along with the activities,
            examination schedule, parent-teachers meet schedules for the session
            and the forth coming holidays.
          </li>
          <li>
            It is a regular feature of the school. A trained Yoga teacher has
            been appointed to train its students in this skill.
          </li>
          <li>
            Value and peace education is imparted to the students regularly.
          </li>
          <li>
            Culture is incredibly important. We believe in mastering the culture
            on the daily basis.
          </li>
          <li>
            Students are sensitised to connect real world issues to regular
            curriculum from the class syllabus. Being a co-educational institute
            the school provides the equal opportunity to all students.
          </li>
          <li>
            Inter-house competitions are a regular feature in Vishwanath
            Academy, Hindi and English Debate, Elocution Contests, Creative
            Writing, Quiz, Dance, Dramatics, Sports and Games, Collage, Rangoli
            Making, etc. are conducted to take out hidden aptitude of children
            and to build confidence in them.
          </li>
          <li>
            Several functions like Annual Cultural Show, Annual Sports Day,
            Annual Fete, Annual Art and Craft Exhibition, Science Exhibitions
            are held in the school to provide platform to each student to
            showcase their talent.
          </li>
          <li>
            Not to forget the sensitive issues, the understanding of the
            environment amongst the students is a major concern in the school.
            Time to time tree plantation, cleanliness drive, workshops on
            hygiene are conducted.
          </li>
        </ul>
      </div>
    ),
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative h-[300px] flex items-center justify-center bg-[#FDF6E4] dark:bg-[#2A1B3D]">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-3 rounded-full shadow-sm"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 -mt-16 relative z-10">
        {/* 2. QUOTES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {quotes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary p-8 rounded-lg min-h-[160px] flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <p
                className={`text-white text-lg font-medium leading-relaxed ${
                  item.isSanskrit ? "italic" : ""
                }`}
              >
                {item.text}
              </p>
              {item.author && (
                <div className="mt-4 flex items-center gap-2 text-white/90 font-semibold font-san">
                  <span>👤</span> {item.author}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 3. MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6 items-stretch">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-2xl"
          >
            <Image
              src="/VNA-About.jpg"
              alt="Students at Vishwanath Academy"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-primary">Vishwanath Academy</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-body text-lg leading-relaxed mb-6 text-justify">
              A curious mind is one which takes the world by surprise. Surprise
              of understanding, surprise of great achievements and surprise of
              doing wonders. We at Vishwanath Academy understand that life is a
              continuous learning process and that education does not mean to
              learn everything as prescribed in the courses rather education
              means learning to learn. A school's real task is to make children
              capable to explore and grow throughout their lives.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-body text-lg leading-relaxed mb-6 text-justify">
              We nurture our students to make them grow in all aspects of life.
              They go beyond books and learn from their lives, experiences and
              the extremely positive energy that is felt as soon as one enters
              the school's campus. The school lays immense significance to
              sports. It does not only keep the students active and physically
              fit but also inculcates strong values like team spirit and never
              to give-up attitude in them. Our school Vishwanath Academy draws
              strength from diverse backgrounds of a huge student base and
              teachers. Their strong bonding and sharing of cultures through
              various co-curricular & cultural activities makes a closed-knit
              support team for each other.
            </p>
          </motion.div>
        </div>

        {/* 4. Full Width Last Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-700 dark:text-gray-300 font-body text-lg leading-relaxed text-justify mb-20 max-w-none"
        >
          We understand a child’s mind is the most curious of all and the
          ever-changing environment of the globe demands more and more from
          them. This makes it even more challenging for teachers. The school has
          the best teachers to guide the young learners. And that the teachers
          themselves keep learning regularly through the various training
          programs conducted by the school. We, at Vishwanath Academy, believe
          education is complete, only when a child imbibes strong moral values.
          And thus like a tree, keeping their roots strongly grounded, they can
          adapt to every situation in life. Truly making them learners for life.
        </motion.p>

        {/* 4. TABS SECTION */}
        <section className="bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row">
          {/* Tab Headers */}
          <div className="flex md:flex-col min-w-[250px] border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 overflow-x-auto md:overflow-visible bg-gray-50 dark:bg-gray-800/50">
            {tabData.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                            px-6 py-5 text-left font-display font-bold text-lg transition-all relative whitespace-nowrap md:whitespace-normal
                            ${
                              activeTab === index
                                ? "text-primary bg-white dark:bg-gray-900 border-l-4 border-primary shadow-sm md:shadow-none"
                                : "text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent"
                            }
                        `}
              >
                <span className="whitespace-pre-line leading-tight block">
                  {tab.title}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="prose dark:prose-invert max-w-none font-body text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
              >
                {tabData[activeTab].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
