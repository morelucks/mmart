'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlass, 
  ShoppingCart, 
  User, 
  Heart, 
  List, 
  Phone,
  Envelope,
  MapPin,
  Package
} from '@phosphor-icons/react';
import { categories } from '@/lib/categories';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cartCount] = useState<number>(3);
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-1">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>🎉 Free delivery on orders above ₦5,000</span>
          <div className="hidden md:flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <Phone size={12} weight="bold" /> 
              +234 800 AYA MARKET
            </span>
            <span className="flex items-center gap-1">
              <Envelope size={12} weight="bold" /> 
              help@ayamarket.com
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Aya Market</h1>
              <p className="text-xs text-gray-500">Decentralized Commerce</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search for products, brands and categories..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors">
                <MagnifyingGlass size={20} weight="bold" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/merchant/dashboard"
              className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-blue-600 bg-blue-50 px-4 py-2 rounded-full transition-colors"
            >
              <Package size={18} weight="bold" />
              <span className="text-sm font-medium">Sell</span>
            </Link>
            
            <button className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <User size={20} weight="bold" />
              <span className="text-sm">Account</span>
            </button>
            
            <button className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Heart size={20} weight="bold" />
              <span className="text-sm">Wishlist</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 relative transition-colors">
              <ShoppingCart size={20} weight="bold" />
              <span className="hidden md:inline text-sm">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <List size={24} weight="bold" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-full">
              <MagnifyingGlass size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-100 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="hidden md:flex items-center space-x-8">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Link 
                    key={index}
                    href={`/category/${category.slug}`}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <IconComponent size={18} weight="bold" className="text-blue-600" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center space-x-4 ml-auto">
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full">
                <MapPin size={16} weight="bold" className="text-gray-500" />
                <span className="text-sm text-gray-700">Lagos, NG</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;