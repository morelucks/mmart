import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl text-white p-8 md:p-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Discover Local Treasures
          </h2>
          <p className="text-lg md:text-xl mb-6 text-blue-100">
            Support your community while enjoying authentic products from local artisans and vendors
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Shopping
            </Button>
            <Link href="/merchant/dashboard">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-blue-600 hover:bg-white hover:text-blue-600"
              >
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;