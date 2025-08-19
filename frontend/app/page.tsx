// app/page.tsx
import React from 'react';
import Layout from '@/app/components/common/Layout';
import Hero from '@/app/components/home/Hero';
import Categories from './components/home/Categories';
import FeaturesBar from './components/home/FeaturesBar';
import ProductGrid from './components/home/ProductGrid';

export default function HomePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Hero />
        <Categories />
        <FeaturesBar />
        <ProductGrid />
      </div>
    </Layout>
  );
}