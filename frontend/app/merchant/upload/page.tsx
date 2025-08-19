import React from 'react';
import Layout from '@/app/components/common/Layout';
import ProductUpload from '@/app/components/merchant/ProductUpload';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Product - Aya Market',
  description: 'Add a new product to your Aya Market store',
  robots: 'noindex, nofollow', // Private page
};

export default function MerchantUploadPage() {
  return (
    <Layout>
      <ProductUpload />
    </Layout>
  );
}