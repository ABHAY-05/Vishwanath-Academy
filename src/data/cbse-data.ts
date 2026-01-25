export type LinkCell = {
  type: "link";
  label: string;
  url: string;
};

export type TableRow = {
  data: (string | LinkCell)[];
};

export type SectionData = {
  title: string;
  headers: string[];
  rows: TableRow[];
  showNote?: boolean;
};

// Helper for creating links easily
const viewLink = (url: string = "#"): LinkCell => ({
  type: "link",
  label: "View",
  url,
});
const textLink = (label: string, url: string = "#"): LinkCell => ({
  type: "link",
  label,
  url,
});

export const cbseData: { aashiana: SectionData[]; dhawapur: SectionData[] } = {
  aashiana: [
    {
      title: "General Information",
      headers: ["SL.NO.", "INFORMATION", "DETAILS"],
      rows: [
        { data: ["1.", "NAME OF THE SCHOOL", "Vishwanath Academy"] },
        { data: ["2.", "AFFILIATION NO (IF APPLICABLE)", "2130885"] },
        { data: ["3.", "SCHOOL CODE (IF APPLICABLE)", "70942"] },
        {
          data: [
            "4.",
            "COMPLETE ADDRESS WITH PIN CODE",
            "Sector M-1, Parag Dairy Road, Aashiana Lucknow- 226012",
          ],
        },
        { data: ["5.", "PRINCIPAL NAME & QUALIFICATION", "Dr. Charu Khare"] },
        {
          data: [
            "6.",
            "SCHOOL E-MAIL ID",
            "vishwanathacademy@gmail.com / vna.aashiana@gmail.com",
          ],
        },
        {
          data: [
            "7.",
            "CONTACT DETAILS (LANDLINE MOBILE)",
            "+91-9169388348, 0522-2431537",
          ],
        },
      ],
    },
    {
      title: "Documents and Information",
      showNote: true,
      headers: ["SL.NO.", "DOCUMENTS/INFORMATION", "UPLOADS DOCUMENTS"],
      rows: [
        {
          data: [
            "1.",
            "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY",
            viewLink(),
          ],
        },
        {
          data: [
            "2.",
            "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE",
            viewLink(),
          ],
        },
        {
          data: [
            "3.",
            "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE BY THE STATE GOVT/UT",
            viewLink(),
          ],
        },
        {
          data: [
            "4.",
            "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT. 2009, AND IT'S RENEWAL IF APPLICABLE (FOR PRIMARY SCHOOL)",
            viewLink(),
          ],
        },
        {
          data: [
            "5.",
            "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT. 2009, AND IT'S RENEWAL IF APPLICABLE (FOR UPPER PRIMARY SCHOOL)",
            viewLink(),
          ],
        },
        {
          data: [
            "6.",
            "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
            viewLink(),
          ],
        },
        {
          data: [
            "7.",
            "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY",
            viewLink(),
          ],
        },
      ],
    },
    {
      title: "Results and Academic",
      headers: ["SL.NO.", "DOCUMENTS/INFORMATION", "UPLOADS DOCUMENTS"],
      rows: [
        { data: ["1.", "FEE STRUCTURE OF THE SCHOOL", viewLink()] },
        { data: ["2.", "ANNUAL ACADEMIC CALANDER", viewLink()] },
        {
          data: ["3.", "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)", viewLink()],
        },
        {
          data: [
            "4.",
            "LIST GF PARENTS TEACHERS ASSOGIATION (PTA) MEMBERS",
            viewLink(),
          ],
        },
      ],
    },
    {
      title: "Result Class: X",
      headers: [
        "SL.NO.",
        "YEAR",
        "NO. OF REGISTERED STUDENTS",
        "NO. OF STUDENTS PASSED",
        "PASS PERCENTAGE",
        "REMARKS",
      ],
      rows: [{ data: ["1.", "2020", "90", "87", "96.67", ""] }],
    },
    {
      title: "Result Class: XII",
      headers: [
        "SL.NO.",
        "YEAR",
        "NO. OF REGISTERED STUDENTS",
        "NO. OF STUDENTS PASSED",
        "PASS PERCENTAGE",
        "REMARKS",
      ],
      rows: [{ data: ["1.", "2020", "90", "87", "96.67", ""] }],
    },
    {
      title: "Staff (Teaching)",
      headers: ["SL.NO.", "INFORMATION", "DETAILS"],
      rows: [
        { data: ["1.", "PRINCIPAL", "Dr. Charu Khare"] },
        { data: ["2.", "TOTAL NO. OF TEACHERS", "42"] },
        { data: ["3.", "TEACHERS SECTION RATIO", "30:1"] },
        { data: ["4.", "DETAILS OF SPECIAL EDUCATOR", "-"] },
        {
          data: [
            "5.",
            "DETAILS OF COUNSELLOR AND WELLNESS TEACHER",
            "Dr. Smita Srivastava",
          ],
        },
      ],
    },
    {
      title: "School Infrastructure",
      headers: ["SL.NO.", "INFORMATION", "DETAILS"],
      rows: [
        {
          data: [
            "1.",
            "TOTAL CAMPUS AREA OF THE SCHOOL(IN SQUARE MTR)",
            "4781",
          ],
        },
        {
          data: [
            "2.",
            "NO. AND SIZE GF THE CLASS ROOMS (IN SQ MTR)",
            "33 & 60",
          ],
        },
        {
          data: [
            "3.",
            "NO. AND SIZE OF LABORATORIES INGLUDING COMPUTERLABS (IN SQ MTR)",
            "6 & 90",
          ],
        },
        { data: ["4.", "INTERNET FACILITY (Y/N)", "Yes"] },
        { data: ["5.", "NO. OF GIRLS TOILETS", "11"] },
        { data: ["6.", "NO. OF BOYS TOILETS", "9"] },
        {
          data: [
            "7.",
            "LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOLCOVERING THE INFRASTRUCTURE OF THE SCHOOL",
            textLink("Link"),
          ],
        },
      ],
    },
  ],
  dhawapur: [
    {
      title: "General Information",
      headers: ["SL.NO.", "INFORMATION", "DETAILS"],
      rows: [
        {
          data: [
            "1.",
            "NAME OF THE SCHOOL",
            "Vishwanath Academy - Dhawapur Branch",
          ],
        },
        { data: ["2.", "AFFILIATION NO (IF APPLICABLE)", "2133362"] },
        { data: ["3.", "SCHOOL CODE (IF APPLICABLE)", "71586"] },
        {
          data: [
            "4.",
            "COMPLETE ADDRESS WITH PIN CODE",
            "DHAWAPUR, 3KM FROM JUNABGANJ TURN ON KANPUR ROAD - MOHANLALGANJ ROAD, LUCKNOW , UTTAR PRADESH - 226401",
          ],
        },
        { data: ["5.", "PRINCIPAL NAME & QUALIFICATION", "Ms CHHAYA JOSHI"] },
        { data: ["6.", "PRINCIPAL QUALIFICATION", "M.A, B.ED"] },
        {
          data: [
            "7.",
            "SCHOOL E-MAIL ID",
            "vna.dhawapur@gmail.com, vishwanathacademy@gmail.com",
          ],
        },
        { data: ["8.", "CONTACT DETAILS OF SCHOOL", "+91-6393025211"] },
      ],
    },
    {
      title: "Documents and Information",
      showNote: true,
      headers: ["SL.NO.", "DOCUMENTS/INFORMATION", "UPLOADS DOCUMENTS"],
      rows: [
        {
          data: [
            "1.",
            "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY",
            viewLink(),
          ],
        },
        {
          data: [
            "2.",
            "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE",
            viewLink(),
          ],
        },
        {
          data: [
            "3.",
            "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT",
            viewLink(),
          ],
        },
        {
          data: [
            "4.",
            "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT'S RENEWAL IF APPLICABLE",
            viewLink(),
          ],
        },
        {
          data: [
            "5.",
            "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
            viewLink(),
          ],
        },
        {
          data: [
            "6.",
            "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY",
            viewLink(),
          ],
        },
        {
          data: [
            "7.",
            "COPY OF THE SELF CERTIFICATION SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION",
            viewLink(),
          ],
        },
        {
          data: [
            "8.",
            "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES",
            viewLink(),
          ],
        },
      ],
    },
    {
      title: "Results and Academic",
      headers: ["SL.NO.", "DOCUMENTS/INFORMATION", "UPLOADS DOCUMENTS"],
      rows: [
        { data: ["1.", "FEE STRUCTURE OF THE SCHOOL", viewLink()] },
        { data: ["2.", "ANNUAL ACADEMIC CALENDER", viewLink()] },
        {
          data: ["3.", "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)", viewLink()],
        },
        {
          data: [
            "4.",
            "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS",
            viewLink(),
          ],
        },
        {
          data: [
            "5.",
            "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION AS PER APPLICABILITY",
            viewLink(),
          ],
        },
      ],
    },
    {
      title: "Staff (Teaching)",
      headers: ["SL.NO.", "INFORMATION", "DETAILS"],
      rows: [
        { data: ["1.", "PRINCIPAL", "MS. CHHAYA JOSHI"] },
        { data: ["2.", "TOTAL NO. OF TEACHERS", "31"] },
        { data: ["3.", "PGT", "7"] },
        { data: ["4.", "TGT", "7"] },
        { data: ["5.", "PRT", "14"] },
        { data: ["6.", "TEACHERS SECTION RATIO", "1:1.5"] },
        { data: ["7.", "DETAILS OF SPECIAL EDUCATOR", "MS MALA SINHA"] },
        {
          data: [
            "8.",
            "DETAILS OF COUNSELLOR AND WELLNESS TEACHER",
            "DR SHRUTI TRIPATHI",
          ],
        },
      ],
    },
    {
      title: "Result Class: X",
      headers: [
        "SL.NO.",
        "YEAR",
        "NO. OF REGISTERED STUDENTS",
        "NO. OF STUDENTS PASSED",
        "PASS PERCENTAGE",
        "REMARKS",
      ],
      rows: [{ data: ["1.", "2024-2025", "7", "7", "100%", ""] }],
    },
    {
      title: "School Infrastructure",
      headers: ["SL.NO.", "INFORMATION", "DETAILS"],
      rows: [
        { data: ["1.", "TOTAL CAMPUS AREA OF THE SCHOOL (IN SQ MTR)", "7993"] },
        {
          data: [
            "2.",
            "NO. AND SIZE OF THE CLASS ROOMS (IN SQ MTR)",
            "Rooms - 48 & Size - 50 sq.m",
          ],
        },
        {
          data: [
            "3.",
            "NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQ MTR)",
            "Physics - 92 sq.m\nChemistry - 83 sq.m\nMaths - 51 sq.m\nBiology - 57 sq.m\nComputer - 100 sq.m\nComposite - 57 sq.m",
          ],
        },
        { data: ["4.", "INTERNET FACILITY", "YES"] },
        { data: ["5.", "NO. OF GIRLS TOILETS", "26"] },
        { data: ["6.", "NO. OF BOYS TOILETS", "30"] },
        {
          data: [
            "7.",
            "LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL",
            textLink("Link"),
          ],
        },
      ],
    },
    {
      title: "Teacher Details",
      headers: ["SL.NO.", "TEACHER NAME", "DESIGNATION", "QUALIFICATION"],
      rows: [
        { data: ["1.", "ANJALI SINGH", "PRT", "M.Sc"] },
        { data: ["2.", "CHHAYA JOSHI", "PRINCIPAL", "M.A."] },
        { data: ["3.", "PANKAJ KUMAR", "PTI", "BPEd"] },
        { data: ["4.", "JYOTI SHARMA", "OTHER", "M.Lib"] },
        { data: ["5.", "ALPANA ARYA", "PRT", "B.A"] },
        { data: ["6.", "ARTI GUPTA", "PRT", "M.A"] },
        { data: ["7.", "GEETA VIG", "NTT", "BA"] },
        { data: ["8.", "DIVYA MISHRA", "PRT", "M.A."] },
        { data: ["9.", "SACHIN DWIVEDI", "TGT", "BCA"] },
        { data: ["10.", "PREETI CHAUDHARY", "TGT", "B.COM."] },
        { data: ["11.", "AKASH SINGH", "TGT", "M.SC"] },
        { data: ["12.", "VIKAS VERMA", "TGT", "BCA"] },
        { data: ["13.", "VINEETA SONI", "PRT", "M.A."] },
        { data: ["14.", "BEENA DEVI", "PGT", "M.A."] },
        { data: ["15.", "OSSEN CHAURASIA", "PRT", "MCOM"] },
        { data: ["16.", "JYOTI SRIVASTAVA", "TGT", "M.A."] },
        { data: ["17.", "NEETU SINGH", "PRT", "M.A."] },
        { data: ["18.", "JUNISH", "OTHER", "VISHARAT"] },
        { data: ["19.", "PRAGYA VERMA", "PRT", "B COM"] },
        { data: ["20.", "PRITI AGARWAL", "NTT", "M.Com."] },
        { data: ["21.", "NIKITA VERMA", "PRT", "B.Sc"] },
        { data: ["22.", "SHIVANI DWIVEDI", "PRT", "B.Sc"] },
        { data: ["23.", "GURSHARAN KAUR", "PRT", "M.A."] },
        { data: ["24.", "EKTA SAHAY", "PRT", "M.A."] },
        { data: ["25.", "VIKASH SINGH", "TGT", "M.A."] },
        { data: ["26.", "AJEET VISHWAKARMA", "PGT", "POST GRADUATION"] },
        { data: ["27.", "PREETI CHAUHAN", "PRT", "B.Sc"] },
        { data: ["28.", "ROMA SINGH", "PRT", "M.Sc."] },
        { data: ["29.", "AJAY SINGH CHAUHAN", "PGT", "M.Sc."] },
        { data: ["30.", "NISHU KUMARI", "PRT", "M.A"] },
        { data: ["31.", "SUCHITRA CHADHA", "PGT", "B.A."] },
      ],
    },
  ],
};
