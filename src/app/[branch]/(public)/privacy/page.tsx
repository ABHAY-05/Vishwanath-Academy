import { Metadata } from "next";
import { seoData } from "@/data/seo-config";
import Image from "next/image";

export const metadata: Metadata = {
  ...seoData.privacy,
};

export default async function PrivacyPolicyPage({
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
              Privacy Policy
            </h1>
            <p className="text-gray-500 font-san text-sm tracking-wider uppercase font-bold">
              Effective Date: 01.01.2025
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-200 font-body leading-loose">
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Vishwanath Academy. At Vishwanath Academy, we respect
              your privacy and are committed to protecting it through this
              policy. This document explains how we collect, use, disclose, and
              safeguard your information when you visit our website,{" "}
              <a
                href="https://www.vishwanathacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-blue-400 hover:text-secondary dark:hover:text-blue-300 underline underline-offset-4"
              >
                www.vishwanathacademy.com
              </a>
              .
            </p>
            <p>
              By using this website, you consent to the practices described in
              this Privacy Policy. If you do not agree with the terms, please
              refrain from using our services.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              2. Information We Collect
            </h2>
            <p>
              We collect the following types of information to provide and
              improve our services:
            </p>

            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mt-8 mb-3">
              a. Personal Information
            </h3>
            <p>
              This includes information that can identify you as an individual,
              such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address</li>
              <li>
                Any information submitted through contact forms, admissions
                forms, or feedback forms.
              </li>
            </ul>

            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mt-8 mb-3">
              b. Non-Personal Information
            </h3>
            <p>
              This includes data that does not directly identify you, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Geographic location (e.g., country or city)</li>
              <li>Pages viewed on our website and time spent.</li>
            </ul>

            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mt-8 mb-3">
              c. Cookies and Tracking Technologies
            </h3>
            <p>
              We use cookies and similar tracking technologies to enhance user
              experience, analyze website performance, and deliver personalized
              content. You can manage your cookie preferences through browser
              settings.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information collected for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                To process inquiries about admissions, programs, and services.
              </li>
              <li>To respond to feedback and suggestions.</li>
              <li>
                To provide information about events, news, and updates related
                to Vishwanath Academy.
              </li>
              <li>To analyze website usage and improve our online services.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              4. Sharing and Disclosure of Information
            </h2>
            <p>
              We value your trust and ensure your information is shared only
              under the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>With Your Consent:</strong> When you provide explicit
                consent to share your information.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share data with
                third-party service providers who assist us in operating our
                website (e.g., hosting providers, analytics tools).
              </li>
              <li>
                <strong>Legal Obligations:</strong> We may disclose information
                when required by law or to protect our rights, safety, or
                property.
              </li>
            </ul>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              5. Data Security
            </h2>
            <p>
              We take appropriate technical and organizational measures to
              secure your personal information from unauthorized access,
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Encryption of sensitive data.</li>
              <li>Regular security audits of our systems.</li>
              <li>
                Restricted access to personal information to authorized
                personnel only.
              </li>
            </ul>
            <p className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 italic mt-6">
              <strong>Please Note:</strong> While we strive to use commercially
              acceptable means to protect your information, no method of
              transmission over the internet or method of electronic storage is
              100% secure.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              6. Retention of Information
            </h2>
            <p>
              We retain your personal information only as long as necessary for
              the purposes outlined in this policy or as required by law. When
              no longer needed, data is securely deleted or anonymized.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              7. Third-Party Links
            </h2>
            <p>
              Our website may include links to third-party websites or services.
              We are not responsible for the privacy practices, policies, or
              content of those third parties. We recommend reviewing their
              privacy policies when you visit their websites.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              8. Children’s Privacy
            </h2>
            <p>
              Protecting the privacy of children is especially important to us.
              Our website is not intended for children under the age of 13
              without parental consent. If we discover that we have collected
              information from a child under 13 without verification of parental
              consent, we will take steps to delete the information promptly.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              9. User Rights
            </h2>
            <p>You have the following rights concerning your personal data:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Access:</strong> You can request a copy of the
                information we have about you.
              </li>
              <li>
                <strong>Correction:</strong> You can ask us to correct
                inaccuracies in your information.
              </li>
              <li>
                <strong>Deletion:</strong> You can request that we delete your
                personal data, subject to legal obligations.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt-out of receiving
                promotional communications at any time.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              details provided below.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, or legal obligations. The
              revised policy will be posted on this page with an updated
              effective date. We encourage you to review this page periodically.
            </p>

            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-12 mb-4">
              11. Contact Us
            </h2>
            <p>
              If you have any questions, concerns, or feedback regarding this
              Privacy Policy or our data practices, please contact us at:
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
