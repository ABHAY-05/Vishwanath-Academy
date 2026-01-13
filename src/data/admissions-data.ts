export type FeeRow = {
  class: string;
  admissionFee: number | string;
  examFee: number | string;
  monthlyFee: number | string;
};

export type BranchFeeData = {
  title: string;
  session: string;
  paymentLink?: string;
  feeRows: FeeRow[];
  extraFees: string[];
  notes: string[];
};

export const admissionsData: Record<string, BranchFeeData> = {
  asiana: {
    title: "AASHIANA BRANCH",
    session: "SESSION - 2025-2026",
    paymentLink: "https://vna.edunext4.com/DirectStudentOnlineFee",
    feeRows: [
      { class: "NUR", admissionFee: 6000, examFee: 2000, monthlyFee: 2500 },
      { class: "LKG", admissionFee: 6000, examFee: 2000, monthlyFee: 2700 },
      { class: "UKG", admissionFee: 6000, examFee: 1550, monthlyFee: 2800 },
      { class: "I", admissionFee: 6000, examFee: 1550, monthlyFee: 3100 },
      { class: "II", admissionFee: 6000, examFee: 1550, monthlyFee: 3300 },
      { class: "III", admissionFee: 6000, examFee: 1550, monthlyFee: 3550 },
      { class: "IV", admissionFee: 6000, examFee: 1550, monthlyFee: 3650 },
      { class: "V", admissionFee: 6000, examFee: 1550, monthlyFee: 3950 },
      { class: "VI", admissionFee: 6000, examFee: 1550, monthlyFee: 4250 },
      { class: "VII", admissionFee: 6000, examFee: 1550, monthlyFee: 4500 },
      { class: "VIII", admissionFee: 6000, examFee: 1550, monthlyFee: 4700 },
      { class: "IX", admissionFee: 8000, examFee: 1550, monthlyFee: 5000 },
      { class: "X", admissionFee: 10000, examFee: 1550, monthlyFee: 5850 },
      { class: "XI", admissionFee: 8000, examFee: 1550, monthlyFee: 6150 },
      { class: "XII", admissionFee: 10000, examFee: 1550, monthlyFee: 6600 },
    ],
    extraFees: [
      "Admission Form Charges : Rs.500/-",
      "Diary Fee and ID Card Fees : Rs.250/-(One Time – Yearly)",
      "Transfer Certificate Fees : Rs.500/-",
      "Transport Facility Available",
    ],
    notes: [
      "We collect 12 months Fee in 4 easy instalments for class Nursery to class I  and 9 easy instalments from classes III to XII.",
      "Please bring fee card at the time of depositing the fees.",
      "Last day of depositing the fee is 10th of every month. In case of late submission of fee a fine of Rs.10/-per day will be charged from 11th of every month.",
      "Cheque Bounce charges will be Rs.400/- per student.",
      "To issue a new card in case of loss Rs.100/- will be charged.",
      "NO REFUND or any adjustment will be made after fee submission.",
      "Once the transport facility availed can not be withdrawn during the session.",
      "For withdrawal of student from the school one month prior notice is required.",
      "Payment made by Cheque should be drawn in favour of “VISHWANATH ACADEMY”.",
      "Parents can now pay the fees online mode or through mobile app.",
      "Fee structure is based on “Uttar Pradesh Self- Financed Independent Schools Fixation of Fee- Ordinance 2018”.",
    ],
  },
  dhawapur: {
    title: "DHAWAPUR BRANCH",
    session: "SESSION - 2025-2026",
    paymentLink: "https://vna.edunext4.com/DirectStudentOnlineFee",
    feeRows: [
      { class: "Nursery", admissionFee: 6000, examFee: 1500, monthlyFee: 2300 },
      {
        class: "LKG & UKG",
        admissionFee: 6000,
        examFee: 1500,
        monthlyFee: 2500,
      },
      { class: "I - II", admissionFee: 6000, examFee: 1500, monthlyFee: 3000 },
      { class: "III - V", admissionFee: 6000, examFee: 1500, monthlyFee: 3500 },
      {
        class: "VI - VIII",
        admissionFee: 6000,
        examFee: 1800,
        monthlyFee: 4000,
      },
      { class: "IX", admissionFee: 8000, examFee: 1800, monthlyFee: 4500 },
      { class: "X", admissionFee: 8000, examFee: 1800, monthlyFee: 4900 },
      { class: "XI", admissionFee: 8000, examFee: 1800, monthlyFee: 5000 },
      { class: "XII", admissionFee: 8000, examFee: 1800, monthlyFee: 5200 },
    ],
    extraFees: [
      "Diary Fees : Rs. 250/- (One Time - yearly)",
      "Transfer Certificate Fees : Rs. 500/-",
      "Admission Form Charges : Rs.500/-",
      "Transport Fees - Optional",
    ],
    notes: [
      "We collect 12 months Fee in 9 easy instalments for classes Nursery to XII.",
      "Please bring fee card at the time of depositing the fees.",
      "Last day of depositing the fee is 10th of every month. In case of late submission of fee a fine of Rs.10/-per day will be charged from 11th of every month.",
      "Cheque Bounce charges will be Rs.400/- per student.",
      "To issue a new card in case of loss Rs.100/- will be charged.",
      "NO REFUND or any adjustment will be made after fee submission.",
      "Once the transport facility availed can not be withdrawn during the session.",
      "For withdrawal of student from the school, one month prior notice is required.",
      "Payment made by Cheque should be drawn in favour of “VISHWANATH ACADEMY“.",
      "Parents can now pay the fees online mode or through mobile app.",
      "Fee structure is based on “Uttar Pradesh Self- Financed Independent Schools Fixation of Fee- Ordinance 2018”.",
    ],
  },
};

export const schoolRules = {
  title: "School Rules",
  image: "/VNA-About.jpg",
  sections: [
    {
      title: "School-House System",
      content: [
        "The student body from class 1 to XII in every branch is divided in four houses-namely NALANDA, VISHWABHARTI, TAKSHIL, VIKRAMSHILA.",
        "The house system forms the base for all the competitions held in all branches. It promotes team spirit, group loyalty and healthy competition.",
      ],
    },
    {
      title: "School Diary",
      content: [
        "School diary is a link between the school and parent.",
        "Parents are requested to sign the diary of their ward regularly to get updated about remarks & information concerning the child.",
      ],
    },
    {
      title: "Attendance",
      content: [
        "Parents are requested to ensure that their wards attend the school regularly. In case of any absence, parents should submit an application to the Class Teacher or Principal.",
        "Long leaves will not be allowed to the students during teaching days except on medical grounds, 75% attendance is compulsory to appear in the terminal examination as per the CBSE norms.",
      ],
    },
    {
      title: "Late Arrival",
      content: [
        "If any child comes late more than three times in a month, a fine of Rs.10 will be charged after three continuous late.",
      ],
    },
    {
      title: "Withdrawals",
      content: [
        "One clear calendar months’ notice in writing, or a month’s fees in lieu of such notice must be given before a pupil is withdrawn from the School.",
        "Those who leave the school in May have to in all cases pay the fees for the months of May and June.",
        "Transfer certificate shall not be issued until all dues of the school are clear.",
        "Students can be restricted from the school on grounds of indiscipline and bad conduct.",
      ],
    },
    {
      title: "Fee Mode of Payments",
      content: [
        "Fee can be paid in Cash, Cheque or Online Mode.",
        "in Aashiana Branch - Fee will be paid in 9 easy instalments from classes III-XII and in 4 instalments from Nursery – Class II",
        "in Dhawapur Branch - Fee will be paid in 9 easy instalments for all classes.",
        "Fee must be paid positively by last day of the month.",
        "Failing this, the same will be accepted with a late fee of Rs.10/- per day upto the last day of the next month.",
        "If you fail to deposit the fee of your ward upto the last day of the next month the name of your ward will be automatically struck-off from the roll without any prior notice or information. Failing this, child will not be allowed to attend classes.",
        "To re-admit the child, you will have to pay Rs.2000/- as re-admission charge with all dues.",
        "If the cheque bounces due to any reason, the fee will be deposited in Demand Draft/Debit or Credit card in the school office along with cheque bouncing charge @ Rs.400/- and admissible late payment.",
        "All dues must be cleared before the commencement of the Term Examination. Failing to this, the child will not be allowed to appear in the Term Examination.",
        "No fine to be waived-off under any circumstances by the Principal.",
      ],
    },
    {
      title: "Important Instructions for Parents/Guardians",
      content: [
        "Parents are requested to be polite with teachers whenever they meet them.",
        "Parents are requested to pay school fees in time.",
        "Parents are requested to provide uniform, books and stationery as prescribed by the school to their wards.",
        "Parents should encourage their wards to maintain regular and punctual attendance in the school and discourage them from staying at home or attending functions which may hinder their studies.",
        "If your ward is absent from school he / she must complete all the pending work in time.",
        "Parents are requested to ensure their participation in PTM to note the Progress of their wards in studies and their behaviour in school.",
        "Parents will sign the Progress Report of their wards and take suitable measures to check lacking areas to remove deficiency if any.",
        "It is parents responsibility to ensure that their ward reaches school at least 5 minutes before the school commences.",
        "Attending morning school assembly is compulsory for all students as it inculcates a sense of companionship and discipline among the student.",
        "Parents must check that their ward is keeping cleanliness and neatness in his / her personal habits, uniform, textbook, exercise book etc.",
        "Parents are requested to ensure that their wards complete the homework daily noted in the school diary.",
        "The name, class and section of the pupil should be clearly marked on all the belongings of the students. Water bottles blazer and jerseys should also bear the name of the student. The school accepts no responsibility whatsoever for loss of any valuable brought to the school.",
        "Parents of girls are advised not to allow wards to wear any jewellery. Besides, their nail should be properly trimmed.",
        "In case your wards suffers from any infectious disease, do not send him/her to the school till the disease is cured.",
        "Parents are not allowed to meet teachers during school hours without the permission of the Principal. Alternatively, they can seek prior appointment from the teacher concerned through the school fairy.",
        "Parents will not be allowed to deliver the tiffin at any cost once the student enters the school. They are advised to check the tiffin of their ward at the time when the child leaves home.",
        "It is imperative for student to participate activity in different co-curricular & extra-curricular activities organized by the school.",
        "The guardians must intimate to the school about any change of their address at the earliest in order to communicate with them in urgent matters.",
        "Giving tip to the employees of the school is not allowed.",
        "Strict action will be taken if a student is found guilty of damaging school property.",
        "To ensure safety of their bicycle, students are advised to lock their bicycle and park them only at allotted bicycle stand.",
        "Parent’s co- operation is required to ensure overall development of their child.",
        "If a child is absent for more than three days without information his/her name will automatically be struck off.",
      ],
    },
  ],
};

export const schoolUniform = {
  title: "School Uniform",
  subtitle: "Circular Summer Uniform",
  columns: ["Class", "Boys", "Girls"],
  rows: [
    {
      class: "Nursery, L.K.G. & U.K.G.",
      boys: "Half Sleeved Dull Pink T-Shirt with Monogram and Blue Half Pant/Short Pant Apron, White Socks with Stripes and Black Velcro Shoes.",
      girls:
        "Half Sleeved dull pink T-Shirt with Monogram, Blue Skirt, Bloomer, Red Hair-Band, Apron, White Socks with Stripes and Black Velcro Shoes.",
    },
    {
      class: "I to IX",
      boys: [
        "Half Sleeved School Check Shirt with Monogram, White Shirt with Monogram, Full blue Colour Pant and Full White Pant (Half Pant only for Class 1 & 2).",
        "P.T. Uniform : House T-Shirt White Full Pant, Socks & White Shoes.",
      ],
      girls: [
        "Half Sleeved Check Shirt will Monogram and White Shirt with Monogram.",
        "Blue Colour pleated Skirt and Bloomer for Class 1st to Class 4th.",
        "Pleated Skirt and Cycling Shorts for Class V to X.",
        "For Class XI and XII Full Sleeved Kurta Nehru Neck with blue Colour Salwar and Dupatta (Cotton).",
        "P.T. Uniform : House T-Shirt with White Skirt for Class I to X and White Skirt till Class 10th on Saturday Tie, Belt, Socks, Black & White Shoes.",
      ],
    },
    {
      class: "XI & XII",
      boys: [
        "Half Sleeved School Check Shirt with Monogram, White Shirt with Monogram, Full blue Colour Pant and Full White Pant.",
        "P.T. Uniform : House T-Shirt White Full Pant, Socks & White Shoes.",
      ],
      girls: ["White Cotton Salwar and White Cotton Dupatta."],
    },
  ],
};

export const subjectCombination = {
  title: "Subject Combination",
  subtitle: "Classes XI & XII",
  streams: [
    {
      name: "1. Science",
      groups: [
        {
          name: "Group-A",
          compulsory: "PCM",
          elective: "Computer Science / Hindi / Phy.Edu",
        },
        {
          name: "Group-B",
          compulsory: "PCB",
          elective: "Computer Science / Hindi / Phy.Edu",
        },
      ],
    },
    {
      name: "2. Commerce",
      groups: [
        {
          name: "Group-A",
          compulsory: "English, Accountancy, B. Studies, Economics",
          elective: "Computer Science / Hindi / Phy.Edu",
        },
      ],
    },
    {
      name: "3. Humanities",
      groups: [
        {
          name: "",
          compulsory: "English, Sociology, History, Political Science",
          elective: "Hindi / Physical Education",
        },
      ],
    },
  ],
};

export const admissionProcedure = {
  title: "Admission Procedure",
  subtitle: "Admission & Evaluation Procedure",
  intro:
    "The school admit boys and girls between the age of 3+ to 16, irrespective of the caste, creed or socio-economic status of their parents.",
  sections: [
    {
      title: "Admission Criteria",
      items: [
        "Admission in class PG and Nursery is based on child’s performance in the interview whereas for classes LKG to IX and XI, admission would be done through entrance test and interview.",
        "The name of the student, date of birth, father’s name, mother’s name will not be changed once filled in the form.",
        "Guardians of the candidates selected for admission are required to present a photocopy of the report card of the previous class, Permanent Education Number [PEN], Parents Photograph, Transfer Certificate from the school last attended at the time of admission within 30 days. Till then admission will be considered provisional, thereafter and after that the admission will be treated as ‘Cancelled’.",
        "Those coming from other districts should have their T. C. countersigned by a competent Educational Authority of the place, PERMANENT EDUCATION NUMBER from UDISE portal.",
        "Birth certificate in original from Nagar Mahapalika/Maternity Hospital would be required for the admission in pre-primary classes.",
      ],
    },
    {
      title: "Pupil Evaluation and Progress Reports",
      description:
        "In keeping with the recommendation of National Policy of Education and National Curriculum Frame work-2005, the schools have integrated ‘Evaluation’ with the over all teaching-learning process. The child’s progress in scholastic & non-scholastic area is reported to parents/guardians periodically as follows:",
      subsections: [
        {
          heading: "Pre-Primary",
          content:
            "At pre-primary stage evaluation of students is done on a three point scale of grading. At pre-primary stage assessment is purely qualitative judgement of children’s activities in various domains and an assessment of the health and physical development, based on observation through everyday interaction.",
        },
        {
          heading: "Classes I To VIII",
          content:
            "The school shall implement uniform system of assessment, examination pattern for classes I to VIII. The assessment structure and examination for these classes will comprise of two terms i.e. Term-I and Term-II.",
          details: [
            "Term-I is the first half of the session which will be of 100 marks in which 20 marks periodic assessment and 80 marks of Half Yearly Examination. Periodic assessment will comprise of 10 marks of periodic test, 5 marks for notebook submission and written work for the term at the end of it and remaining 5 marks for subject enrichment activity.",
            "Term-II is the second half of the session which will be of 100 marks in which 20 marks for periodic assessment and 80 marks of yearly examination. Periodic Assessment will be same as in Term-I. However, in annual examination of classes VI to VIII, significant topics of first term in each subject will be included along with second term syllabus. The annual progress report is given after the compilation of Term-I & Term-II result.",
          ],
        },
        {
          heading: "Classes IX & XI",
          content:
            "Evaluation of student is done as per the CBSE guidelines and directives.",
        },
      ],
    },
    {
      title: "Academic Session",
      content: "School’s academic session is from April to March.",
    },
  ],
};
