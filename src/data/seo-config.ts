export const seoData = {
  default: {
    title: "Vishwanath Academy | Excellence in Education",
    description:
      "Vishwanath Academy, Lucknow - Empowering students with holistic education, modern facilities, and a value-based curriculum.",
    keywords: [
      "Vishwanath Academy",
      "School in Lucknow",
      "CBSE School",
      "Best School in Aashiana",
      "Best School in Dhawapur",
      "Education",
      "Learning",
    ],
    ogImage: "/dhawapur.webp",
    url: "https://vishwanath-academy-mu.vercel.app",
  },
  home: {
    title: "Home | Vishwanath Academy",
    description:
      "Welcome to Vishwanath Academy. We provide a nurturing environment for students to explore, learn, and grow. Distinguished for its holistic approach.",
  },
  about: {
    main: {
      title: "About Us | Vishwanath Academy",
      description:
        "Learn about our vision, mission, and the philosophy that drives Vishwanath Academy. Discover our journey and values.",
    },
    team: {
      title: "Our Team | Vishwanath Academy",
      description:
        "Meet the visionary leaders, directors, principals, and dedicated educators behind Vishwanath Academy's success.",
    },
    facilities: {
      title: "Facilities | Vishwanath Academy",
      description:
        "Explore our world-class facilities including smart classes, advanced laboratories, library, and transportation.",
    },
    beyond: {
      title: "Beyond Classroom | Vishwanath Academy",
      description:
        "Discover our extracurricular activities, sports, excursions, and holistic development programs that go beyond textbooks.",
    },
  },
  academics: {
    curriculum: {
      title: "Curriculum | Vishwanath Academy",
      description:
        "Explore the holistic CBSE curriculum at Vishwanath Academy, focusing on the whole child from Primary to Senior years.",
    },
    calendar: {
      title: "Activity Calendar | Vishwanath Academy",
      description:
        "Monthly activity calendar for Pre-Nur to Prep, I to II, and III to V at Vishwanath Academy. Download PDFs for details.",
    },
    books: {
      title: "Books & Stationary | Vishwanath Academy",
      description:
        "Download the list of books and stationary for all classes at Vishwanath Academy.",
    },
    competitive: {
      title: "Competitive Exams | Vishwanath Academy",
      description:
        "Explore various competitive exams after 12th in Science, Commerce, and Arts streams including JEE, NEET, CLAT, NIFT, and more.",
    },
  },
  admissions: {
    procedure: {
      title: "Admission Procedure | Vishwanath Academy",
      description:
        "Admission criteria, pupil evaluation process, and academic session details for Vishwanath Academy.",
    },
    rules: {
      title: "School Rules | Vishwanath Academy",
      description:
        "Guidelines and rules for students and parents at Vishwanath Academy regarding attendance, uniform, and conduct.",
    },
    subjects: {
      title: "Subject Combination | Vishwanath Academy",
      description:
        "Subject combinations available for Class XI & XII at Vishwanath Academy across Science, Commerce, and Humanities streams.",
    },
    uniform: {
      title: "School Uniform | Vishwanath Academy",
      description:
        "Details regarding the circular summer uniform for boys and girls at Vishwanath Academy.",
    },
    fees: {
      // Dynamic title handled by helper or component using fees data
      title: "Fee Structure | Vishwanath Academy",
      description: "View the fee structure for the current academic session.",
    },
  },
  results: {
    scholarship: {
      title: "Scholarship Results | Vishwanath Academy",
      description:
        "View the list of meritorious students awarded with the Shri Markandey Tewari Bright Child Scholarship.",
    },
    board: {
      title: "Board Exam Results | Vishwanath Academy",
      description:
        "Check the latest CBSE Board Exam results for Class X and XII.",
    },
    awards: {
      title: "School Awards | Vishwanath Academy",
      description:
        "Explore the prestigious awards and recognitions earned by Vishwanath Academy and its students.",
    },
  },
  privacy: {
    title: "Privacy Policy | Vishwanath Academy",
    description:
      "Read the Privacy Policy of Vishwanath Academy, Lucknow. Understand how we collect, use, and protect your personal information.",
    keywords: [
      "privacy policy",
      "data protection",
      "vishwanath academy privacy",
      "school privacy terms",
      "lucknow school data policy",
    ],
  },
  terms: {
    title: "Terms and Conditions | Vishwanath Academy",
    description:
      "Read the Terms and Conditions for using the Vishwanath Academy website.",
    keywords: [
      "terms and conditions",
      "website terms",
      "vishwanath academy terms",
      "school policies",
      "usage conditions",
    ],
  },
};

export const getBranchSeo = (
  page:
    | "noticeBoard"
    | "gallery"
    | "contact"
    | "cbse"
    | "fees"
    | "scholarship"
    | "awards"
    | "press"
    | "downloadTc"
    | "downloadTc"
    | "career"
    | "bedTraining"
    | "board",
  branch: string,
  extra?: string,
) => {
  const capitalizedBranch = branch.charAt(0).toUpperCase() + branch.slice(1);

  switch (page) {
    case "noticeBoard":
      return {
        title: `Notice Board | Vishwanath Academy ${capitalizedBranch}`,
        description: `Stay updated with the latest announcements, circulars, and news from Vishwanath Academy ${capitalizedBranch} branch.`,
      };
    case "gallery":
      return {
        title: `Gallery | Vishwanath Academy ${capitalizedBranch}`,
        description: `Explore the vibrant life, events, and memories at Vishwanath Academy ${capitalizedBranch} branch through our photo gallery.`,
      };
    case "contact":
      return {
        title: `Contact Us | Vishwanath Academy ${capitalizedBranch}`,
        description: `Get in touch with Vishwanath Academy ${capitalizedBranch} branch. Find our address, phone number, email, and location map.`,
      };
    case "cbse":
      return {
        title: `CBSE Disclosure | Vishwanath Academy ${capitalizedBranch}`,
        description: `Official CBSE mandatory public disclosure documents and data for Vishwanath Academy ${capitalizedBranch} campus.`,
      };
    case "fees":
      return {
        title: `Fee Structure - ${extra} | Vishwanath Academy`,
        description: `View the fee structure for ${extra} for the session at Vishwanath Academy ${capitalizedBranch}.`,
      };
    case "scholarship":
      return {
        title: `Scholarship Results | Vishwanath Academy ${capitalizedBranch}`,
        description: `View the list of meritorious students awarded with the Shri Markandey Tewari Bright Child Scholarship at Vishwanath Academy ${capitalizedBranch}.`,
      };
    case "board":
      return {
        title: `Board Exam Results | Vishwanath Academy ${capitalizedBranch}`,
        description: `Check the latest CBSE Board Exam results for Class X and XII at Vishwanath Academy ${capitalizedBranch}.`,
      };
    case "awards":
      return {
        title: `School Awards | Vishwanath Academy ${capitalizedBranch}`,
        description: `Explore the prestigious awards and recognitions earned by Vishwanath Academy ${capitalizedBranch} and its students.`,
      };
    case "press":
      return {
        title: `Press Releases | Vishwanath Academy ${capitalizedBranch}`,
        description: `Read the latest press releases and news coverage featuring Vishwanath Academy ${capitalizedBranch}.`,
      };
    case "downloadTc":
      return {
        title: `Download TC | Vishwanath Academy ${capitalizedBranch}`,
        description: `Securely download your Transfer Certificate for the ${capitalizedBranch} branch by entering your Admission Number.`,
      };
    case "career":
      return {
        title: `Career & Hiring | Vishwanath Academy ${capitalizedBranch}`,
        description: `Explore current job openings and apply to join the teaching and administrative staff at Vishwanath Academy ${capitalizedBranch}.`,
      };
    case "bedTraining":
      return {
        title: `B.Ed Training Application | Vishwanath Academy ${capitalizedBranch}`,
        description: `Apply for the B.Ed Training program at Vishwanath Academy ${capitalizedBranch}. Submit your academic details and college letter online.`,
      };
    default:
      return seoData.default;
  }
};
