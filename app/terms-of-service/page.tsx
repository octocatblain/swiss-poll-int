import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-5xl font-bold text-primary mb-8">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last Updated: January 2024
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                By accessing or using the services of Swiss Poll International,
                you agree to be bound by these Terms of Service. If you disagree
                with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                2. Services Description
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Swiss Poll International provides market research, opinion
                polling, and consumer insight services. The specific scope of
                services will be defined in individual engagement agreements
                with clients.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                3. Client Obligations
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Clients agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Provide accurate and complete information</li>
                <li>Cooperate in good faith throughout the research process</li>
                <li>Respect confidentiality obligations</li>
                <li>Make timely payments as agreed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                All research methodologies, reports, and deliverables remain the
                intellectual property of SWISS POLL INTERNATIONAL unless
                otherwise agreed in writing. Clients receive a license to use
                research findings for their internal business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                5. Confidentiality
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                We maintain strict confidentiality regarding all client
                information and research data. Both parties agree not to
                disclose confidential information without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Swiss Poll International shall not be liable for any indirect,
                incidental, special, or consequential damages arising from the
                use of our services. Our total liability shall not exceed the
                fees paid for the specific service in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                7. Governing Law
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of Switzerland. Any disputes shall be subject to
                the exclusive jurisdiction of the courts of Zürich, Switzerland.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                8. Contact Information
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                For questions about these Terms of Service, please contact:
                <br />
                Email: legal@swisspollint.com
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
