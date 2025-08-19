// app/components/home/Categories.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/app/components/ui/Card';
import { categories } from '@/lib/categories';

const Categories: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Link key={index} href={`/category/${category.slug}`}>
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                <div className="text-blue-600 mb-4 flex justify-center">
                  <IconComponent size={48} weight="bold" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{category.name}</h4>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;