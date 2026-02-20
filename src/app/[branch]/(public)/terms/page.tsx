import { Metadata } from "next";
import { seoData } from "@/data/seo-config";
import Image from "next/image";

export const metadata: Metadata = {
  ...seoData.terms,
};

export default async function TermsAndConditionsPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;

  return (
    <>
      <main className="bg-gray-50 dark:bg-gray-950 min-h-screen py-32 px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 overflow-hidden">
          <div className="mb-10 text-center border-b border-gray-100 dark:border-gray-800 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-primary dark:text-white mb-4">
              Terms and Conditions
            </h1>
            <p className="text-gray-500 font-san text-sm tracking-wider uppercase font-bold">
              Effective Date: 01.01.2025
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-200 font-body leading-loose">
            <p>Welcome to Vishwanath Academy’s Website</p>
            <p>
              Thank you for visiting the Vishwanath Academy website (
              <a
                href="https://www.vishwanathacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-blue-400 hover:text-secondary dark:hover:text-blue-300 underline underline-offset-4"
              >
                www.vishwanathacademy.com
              </a>
              ). By accessing or using our website, you agree to comply with and
              be bound by these Terms and Conditions. If you do not agree to
              these terms, you are advised not to use our website.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              1. Definitions
            </h2>
            <p>For the purpose of these Terms and Conditions:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>“Website”</strong> refers to www.vishwanathacademy.com.
              </li>
              <li>
                <strong>“User”</strong> or <strong>“You”</strong> refers to the
                individual or entity accessing our website.
              </li>
              <li>
                <strong>“We,” “Us,”</strong> or <strong>“Our”</strong> refers to
                Vishwanath Academy.
              </li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              2. Website Usage
            </h2>
            <p>The following terms govern the use of our website:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                You must be at least 18 years old to use this website or have
                parental/guardian consent.
              </li>
              <li>
                The website is for informational purposes only and should not be
                used for any unlawful or prohibited activities.
              </li>
              <li>
                You agree to use the website in a manner that does not damage,
                disable, or impair the website or interfere with other users’
                ability to use it.
              </li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              3. Intellectual Property
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                All content, including text, images, graphics, logos, videos,
                and design elements, is the property of Vishwanath Academy and
                is protected by copyright, trademark, and other intellectual
                property laws.
              </li>
              <li>
                You may not reproduce, distribute, or publicly display any
                content from this website without prior written permission.
              </li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              4. User Responsibilities
            </h2>
            <p>When using the website, you agree:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                To provide accurate, current, and complete information if you
                submit any forms.
              </li>
              <li>
                Not to engage in unauthorized activities, including hacking,
                introducing malicious software, or attempting to breach website
                security.
              </li>
              <li>
                Not to upload or share content that is offensive, harmful,
                defamatory, or otherwise inappropriate.
              </li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              5. Admissions and Enrollment
            </h2>
            <p>
              Information provided on the website about admissions, courses, or
              other academic-related services is subject to change. Submission
              of an inquiry or application form does not guarantee admission,
              which is subject to Vishwanath Academy’s policies and eligibility
              criteria.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              6. Limitation of Liability
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                Vishwanath Academy makes no guarantees about the accuracy,
                completeness, or reliability of the information on this website.
                The content is provided “as is.”
              </li>
              <li>
                We are not liable for any direct, indirect, incidental, or
                consequential damages arising from your use of the website or
                reliance on its content.
              </li>
              <li>
                Vishwanath Academy is not responsible for interruptions, errors,
                or unauthorized access to the website.
              </li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              7. Third-Party Links
            </h2>
            <p>
              Our website may include links to third-party websites for your
              convenience. We do not endorse, control, or assume responsibility
              for the content or policies of these external sites. Users are
              advised to review the terms and privacy policies of any
              third-party website they visit.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              8. Termination of Access
            </h2>
            <p>
              We reserve the right to terminate or suspend access to the
              website, without notice, for any reason, including violations of
              these Terms and Conditions.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              9. Disclaimer
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                The website content is provided for general informational
                purposes only and is not intended to substitute for professional
                advice.
              </li>
              <li>
                Vishwanath Academy does not warrant that the website will be
                uninterrupted, error-free, or free of harmful components.
              </li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              10. Privacy
            </h2>
            <p>
              Our Privacy Policy outlines how we collect, use, and protect your
              personal information. By using this website, you consent to the
              practices described in our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              11. Governing Law
            </h2>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of India. Any disputes arising from the
              use of this website shall be subject to the exclusive jurisdiction
              of the courts in Lucknow, Uttar Pradesh.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              12. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or update these Terms and
              Conditions at any time without prior notice. Changes will be
              effective immediately upon posting. Continued use of the website
              after changes signifies your acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              13. Contact Information
            </h2>
            <p>
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at:
            </p>

            {/* Signature Area */}
            <div className="my-10 text-center">
              <Image
                src="/signature.webp"
                alt="Vishwanath Academy Management"
                width={400}
                height={120}
                className="mx-auto block w-[80%] max-w-[400px] h-auto opacity-90"
              />
              <p className="mt-4 font-bold text-sm uppercase text-gray-900 dark:text-white tracking-widest leading-loose">
                A CO-EDUCATIONAL & ENGLISH MEDIUM SCHOOL{" "}
                <br className="hidden md:block" /> (NURSERY – XII). AFFILIATED
                TO CBSE.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/20 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Aashiana Details */}
                {branch === "aashiana" && (
                  <div className="md:col-span-2 max-w-lg mx-auto w-full text-left">
                    <h3 className="text-xl font-bold font-display text-primary dark:text-secondary mb-1">
                      AASHIANA BRANCH
                    </h3>
                    <p className="text-xs font-bold text-gray-500 mb-6">
                      (Affiliation No. 2130885)
                    </p>

                    <address className="not-italic text-sm space-y-4 flex flex-col items-start bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mt-4">
                      <p className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                          Address
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">
                          Sector M-1, Parag Dairy Road, Aashiana ,
                          Lucknow-226012
                        </span>
                      </p>
                      <p className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                          Contact
                        </span>
                        <span>
                          <a
                            href="tel:05222431537"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                          >
                            0522-2431537
                          </a>{" "}
                          /{" "}
                          <a
                            href="tel:+919169388348"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                          >
                            +91-9169388348
                          </a>
                        </span>
                      </p>
                      <p className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                          Email
                        </span>
                        <span className="flex flex-col items-start">
                          <a
                            href="mailto:vishwanathacademy@gmail.com"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                          >
                            vishwanathacademy@gmail.com
                          </a>
                          <a
                            href="mailto:vna.aashiana@gmail.com"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                          >
                            vna.aashiana@gmail.com
                          </a>
                        </span>
                      </p>
                      <p className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                          Facebook
                        </span>
                        <a
                          href="https://www.facebook.com/vna.lko"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                        >
                          www.facebook.com/vna.lko
                        </a>
                      </p>
                    </address>
                  </div>
                )}

                {/* Dhawapur Details */}
                {branch === "dhawapur" && (
                  <div className="md:col-span-2 max-w-lg mx-auto w-full text-left">
                    <h3 className="text-xl font-bold font-display text-primary dark:text-secondary mb-1">
                      DHAWAPUR BRANCH
                    </h3>
                    <p className="text-xs font-bold text-gray-500 mb-6">
                      (Affiliation No. 2133362)
                    </p>

                    <address className="not-italic text-sm space-y-4 flex flex-col items-start bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mt-4">
                      <p className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                          Address
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">
                          Dhawapur, 3 Km From Junabganj Turn On Kanpur Road ,
                          Near Memora Airforce Station, Lucknow-226401.
                        </span>
                      </p>
                      <p className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                          Contact
                        </span>
                        <a
                          href="tel:+916393025211"
                          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                        >
                          +91-6393025211
                        </a>
                      </p>
                      <p className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                          Email
                        </span>
                        <a
                          href="mailto:vna.dhawapur@gmail.com"
                          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                        >
                          vna.dhawapur@gmail.com
                        </a>
                      </p>
                      <p className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                          Facebook
                        </span>
                        <a
                          href="https://www.facebook.com/vna.dhawapur"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                        >
                          www.facebook.com/vna.dhawapur
                        </a>
                      </p>
                    </address>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
