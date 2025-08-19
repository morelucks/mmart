"use client";
import React from 'react';
import Link from 'next/link';
import { 
  FacebookLogo, 
  TwitterLogo, 
  InstagramLogo,
  LinkedinLogo
} from '@phosphor-icons/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <span className="text-lg font-bold">Aya Market</span>
            </div>
            <p className="text-gray-300 text-sm mb-4 max-w-md">
              Empowering local economies through decentralized commerce. Supporting artisans and communities across Nigeria.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookLogo size={18} weight="bold" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterLogo size={18} weight="bold" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramLogo size={18} weight="bold" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinLogo size={18} weight="bold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/merchant/dashboard" className="hover:text-white transition-colors">Sell on Aya</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 Aya Market. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Powered by blockchain technology 🔗</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;