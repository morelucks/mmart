// app/category/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Layout from '@/app/components/common/Layout';
import CategoryHeader from '@/app/components/category/CategoryHeader';
import CategoryFilters from '@/app/components/category/CategoryFilters';
import CategoryProductGrid from '@/app/components/category/CategoryProductGrid';
import { categoriesData, products } from '@/lib/data';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  return categoriesData.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categoriesData.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found - Aya Market',
    };
  }

  return {
    title: `${category.name} - Aya Market`,
    description: `Discover amazing ${category.name.toLowerCase()} from local artisans and vendors. Shop authentic products with secure blockchain-powered transactions.`,
    keywords: [category.name, 'local products', 'artisans', 'Nigeria', 'marketplace'],
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Find the category based on slug
  const categoryData = categoriesData.find(c => c.slug === params.slug);

  if (!categoryData) {
    notFound();
  }

  // Filter products by category
  const categoryProducts = products.filter(product => 
    product.category.toLowerCase() === categoryData.name.toLowerCase()
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <CategoryHeader categoryData={categoryData} productCount={categoryProducts.length} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <CategoryFilters categoryData={categoryData} />
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              <CategoryProductGrid 
                products={categoryProducts} 
                categoryData={categoryData}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}