// app/product/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Layout from '@/app/components/common/Layout';
import ProductDetail from '@/app/components/product/ProductDetail';
import { products } from '@/lib/data';
import { Product } from '@/types';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const product = products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    return {
      title: 'Product Not Found - Aya Market',
    };
  }

  return {
    title: `${product.name} - Aya Market`,
    description: product.description,
    keywords: [product.name, product.category, 'Aya Market', ...product.features],
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <Layout>
      <ProductDetail product={product} />
    </Layout>
  );
}