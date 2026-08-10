'use client';

interface Props {
  contactEmail: string;
  contactPhone: string | null;
}

export default function ContactSection({ contactEmail, contactPhone }: Props) {
  return (
    <section id="contact" className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Get in Touch</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Have a question about a resource or need something custom? Reach out anytime!
        </p>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-4">
            {contactEmail && (
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">✉️</span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-sky-500 hover:text-sky-600 font-medium transition-colors"
                >
                  <span suppressHydrationWarning>{contactEmail}</span>
                </a>
              </div>
            )}
            {contactPhone && (
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">📞</span>
                <span className="text-gray-700 font-medium" suppressHydrationWarning>{contactPhone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
