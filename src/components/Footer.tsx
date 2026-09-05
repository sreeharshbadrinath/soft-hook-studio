import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenCommission: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCommission,
}) => {
  return (
    <footer id="main-footer" className="bg-[#131614] text-white pt-14 sm:pt-18 pb-12 px-6 sm:px-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Giant Centered Wordmark & Socials (Exact Frame 00:07 - 00:08) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-stone-800">
          {/* Invisible spacer on left for desktop centering */}
          <div className="hidden md:block w-32" />

          {/* Giant Center Condensed Brand Wordmark */}
          <div className="text-center flex-1">
            <h2
              onClick={() => onSelectCategory('all')}
              className="font-display text-5xl sm:text-7xl md:text-8xl text-white tracking-tight cursor-pointer hover:text-stone-300 transition-colors select-none"
            >
              SOFT HOOK
            </h2>
          </div>

          {/* Social Icons (Facebook, Instagram, Pinterest) */}
          <div className="flex items-center gap-3.5 text-white/90">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Pinterest"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.174.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 4-Column Structured Footer Navigation (Exact Layout Frame 00:08) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-12 border-b border-stone-800 text-xs">
          {/* Col 1: Company */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-white text-[13px]">
              Company
            </h3>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <a href="#editorial-showcase" className="hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#editorial-showcase" className="hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCommission}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  News & Custom Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Catalog */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-white text-[13px]">
              Catalog
            </h3>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('clothing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Weaved Clothing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bags')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Crochet Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('purses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Artisanal Purses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('toys')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Amigurumi Toys
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Terms & Policy */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-white text-[13px]">
              Terms & Policy
            </h3>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cookie Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sustainable Fiber Sourcing
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-white text-[13px] text-left md:text-right">
              Contact
            </h3>
            <ul className="space-y-2.5 text-stone-400 text-left md:text-right">
              <li className="flex items-center md:justify-end gap-2">
                <span className="hover:text-white transition-colors">
                  support@softhookstudio.com
                </span>
                <Mail className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              </li>
              <li className="flex items-center md:justify-end gap-2">
                <span className="hover:text-white transition-colors">
                  +1 (123) 456-7890
                </span>
                <Phone className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              </li>
              <li className="flex items-center md:justify-end gap-2">
                <span className="hover:text-white transition-colors">
                  Store Locations
                </span>
                <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Small Print */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Soft Hook Studio. Handcrafted Clothing & Artisanal Crochets.</p>
          <p className="tracking-wide">Designed with slow fashion & natural organic fibers.</p>
        </div>
      </div>
    </footer>
  );
};
