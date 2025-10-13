import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-5xl font-bold text-primary mb-8">
            Cookie Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last Updated: January 2024
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                1. What Are Cookies
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Cookies are small text files that are placed on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and provide information to
                website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                2. How We Use Cookies
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Swiss Poll International uses cookies for the following
                purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website
                  to function properly
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors interact with our website
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Remember your
                  preferences and settings
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Track your browsing habits
                  to deliver relevant advertising
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                3. Types of Cookies We Use
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Session Cookies
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Temporary cookies that expire when you close your browser.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Persistent Cookies
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Remain on your device for a set period or until you delete
                    them.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                4. Managing Cookies
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                You can control and manage cookies in various ways. Please note
                that removing or blocking cookies can impact your user
                experience and some functionality may no longer be available.
                Most browsers allow you to refuse or accept cookies through
                their settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">
                5. Contact Us
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have questions about our use of cookies, please contact
                us at:
                <br />
                Email: privacy@swisspollint.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
