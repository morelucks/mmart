'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react';
import { CategoryData } from '@/types';
import { getCategoryIcon } from '@/lib/categories';

interface CategoryHeaderProps {
  categoryData: CategoryData;
  productCount: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryData, productCount }) => {
  const IconComponent = getCategoryIcon(categoryData.name);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-blue-200 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Categories</span>
          <span>/</span>
          <span className="text-white">{categoryData.name}</span>
        </div>

        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} weight="bold" />
          <span>Back to Home</span>
        </Link>

        {/* Category Info */}
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
            {IconComponent && <IconComponent size={40} weight="bold" className="text-white" />}
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{categoryData.name}</h1>
            <p className="text-xl text-blue-100 mb-4">
              {productCount} {productCount === 1 ? 'product' : 'products'} available
            </p>
            <p className="text-blue-200 max-w-2xl">
              Discover authentic {categoryData.name.toLowerCase()} from local artisans and vendors. 
              Each product is carefully curated to ensure quality and authenticity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;