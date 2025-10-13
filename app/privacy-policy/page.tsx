import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-5xl font-bold text-primary mb-8">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last Updated: January 2024
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                1. Introduction
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Swiss Poll International ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website or engage our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                2. Information We Collect
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We may collect information about you in a variety of ways,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>
                  Personal Data: Name, email address, phone number, company
                  information
                </li>
                <li>
                  Survey Responses: Data collected through our research studies
                </li>
                <li>Usage Data: Information about how you use our website</li>
                <li>
                  Cookies and Tracking Technologies: Data collected through
                  cookies and similar technologies
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Provide, operate, and maintain our services</li>
                <li>Conduct market research and opinion polling</li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                4. Data Security
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information. However, no
                method of transmission over the Internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                5. Your Rights
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Under applicable data protection laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                6. Contact Us
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have questions about this Privacy Policy, please contact
                us at:
                <br />
                Email: privacy@swisspollint.com
                <br />
                Phone: +41 44 123 45 67 / +254 732 333 133
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
