import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-5xl font-bold text-primary mb-12">Impressum</h1>

          <Card>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Company Information
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>
                    <strong>Company Name:</strong> Swiss Poll International AG
                  </p>
                  <p>
                    <strong>Legal Form:</strong> Aktiengesellschaft (AG)
                  </p>
                  <p>
                    <strong>Registration Number:</strong> CHE-123.456.789
                  </p>
                  <p>
                    <strong>VAT Number:</strong> CHE-123.456.789 MWST
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Headquarters
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>Swiss Poll International AG</p>
                  <p>Bahnhofstrasse 100</p>
                  <p>8001 Zürich</p>
                  <p>Switzerland</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Contact
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>
                    <strong>Phone:</strong> +41 44 123 45 67
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:info@swisspollint.com"
                      className="text-primary hover:underline"
                    >
                      info@swisspollint.com
                    </a>
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href="https://www.swisspollint.com"
                      className="text-primary hover:underline"
                    >
                      www.swisspollint.com
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Management
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>
                    <strong>Chief Executive Officer:</strong> Dr. Klaus Müller
                  </p>
                  <p>
                    <strong>Chief Research Officer:</strong> Dr. Sophie Laurent
                  </p>
                  <p>
                    <strong>Chief Operations Officer:</strong> Marco Bianchi
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Supervisory Authority
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>Handelsregisteramt des Kantons Zürich</p>
                  <p>Commercial Register Office of the Canton of Zurich</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Professional Memberships
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>
                    ESOMAR (European Society for Opinion and Marketing Research)
                  </p>
                  <p>WAPOR (World Association for Public Opinion Research)</p>
                  <p>Swiss Marketing Association</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Disclaimer
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  The content of this website has been compiled with meticulous
                  care and to the best of our knowledge. However, we cannot
                  assume any liability for the up-to-dateness, completeness or
                  accuracy of any of the pages. All information is subject to
                  change without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Copyright
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  © 2025 Swiss Poll International AG. All rights reserved. The
                  content and works on these pages created by the site operators
                  are subject to Swiss copyright law.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
