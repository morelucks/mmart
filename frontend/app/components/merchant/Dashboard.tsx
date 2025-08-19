'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import StatsCard from './StatsCard';
import ProductList from './ProductList';
import { 
  Plus,
  TrendUp,
  Package,
  ShoppingCart,
  Star
} from '@phosphor-icons/react';
import { merchantStats } from '@/lib/data';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const recentActivity = [
    { 
      action: 'New order received', 
      item: 'Premium Ofada Rice', 
      time: '2 hours ago', 
      status: 'pending',
      color: 'bg-yellow-100 text-yellow-800'
    },
    { 
      action: 'Product review', 
      item: 'Handwoven Ankara Dress', 
      time: '5 hours ago', 
      status: 'positive',
      color: 'bg-green-100 text-green-800'
    },
    { 
      action: 'Order completed', 
      item: 'Tiger Nut Drink', 
      time: '1 day ago', 
      status: 'completed',
      color: 'bg-blue-100 text-blue-800'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendUp size={16} weight="bold" /> },
    { id: 'products', label: 'Products', icon: <Package size={16} weight="bold" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={16} weight="bold" /> },
    { id: 'analytics', label: 'Analytics', icon: <Star size={16} weight="bold" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Merchant Dashboard</h1>
            <p className="text-gray-600">Welcome back, Mama Kudi Foods</p>
          </div>
          <Link href="/merchant/upload">
            <Button size="lg" className="flex items-center space-x-2">
              <Plus size={20} weight="bold" />
              <span>Add Product</span>
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {merchantStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                      </div>
                      <div className="text-right flex items-center space-x-3">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.color}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && <ProductList />}

            {activeTab === 'orders' && (
              <div className="text-center py-12">
                <ShoppingCart size={48} weight="light" className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Orders Management</h3>
                <p className="text-gray-500">Track and manage your customer orders here.</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <Star size={48} weight="light" className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics & Reports</h3>
                <p className="text-gray-500">View detailed analytics about your sales and performance.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;