'use client';

interface Props {
  brandName: string;
  sellerName: string;
  tptStoreUrl: string;
  onOpenLegal: (type: 'privacy' | 'terms' | 'refund') => void;
}

export default function Footer({ brandName, sellerName, tptStoreUrl, onOpenLegal }: Props) {
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
