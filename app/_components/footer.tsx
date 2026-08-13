'use client';

interface Props {
  brandName: string;
  sellerName: string;
  tptStoreUrl: string;
  pinterestUrl?: string | null;
  onOpenLegal: (type: 'privacy' | 'terms' | 'refund') => void;
}

export default function Footer({ brandName, sellerName, tptStoreUrl, pinterestUrl, onOpenLegal }: Props) {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/logo.png"
                alt={`${brandName ?? 'My TPT Store'} logo`}
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold">{brandName ?? 'My TPT Store'}</span>
            </div>
            <p className="text-gray-400 text-sm">Created by {sellerName ?? 'Your Name'}</p>
            {pinterestUrl ? (
              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Pinterest profile"
                title="Pinterest"
                className="mt-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-gray-300 hover:bg-[#E60023] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.739a.36.36 0 0 1 .083.345c-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146A12 12 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            ) : null}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2">
              <a href="/#about" className="block text-gray-400 hover:text-white text-sm transition-colors">About</a>
              <a href="/products" className="block text-gray-400 hover:text-white text-sm transition-colors">Products</a>
              <a href="/#faq" className="block text-gray-400 hover:text-white text-sm transition-colors">FAQ</a>
              <a href="/#contact" className="block text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
              <a href={tptStoreUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors">TPT Store</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <div className="space-y-2">
              <a href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="/legal/terms-of-service" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="/legal/refund-policy" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} {brandName ?? 'My TPT Store'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
