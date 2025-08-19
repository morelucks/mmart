// app/merchant/dashboard/page.tsx
import React from 'react';
import Layout from '@/app/components/common/Layout';
import Dashboard from '@/app/components/merchant/Dashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merchant Dashboard - Aya Market',
  description: 'Manage your products, orders, and analytics on Aya Market',
  robots: 'noindex, nofollow', // Private page
};

export default function MerchantDashboardPage() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}