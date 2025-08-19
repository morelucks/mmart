// app/components/home/FeaturesBar.tsx
'use client';

import React from 'react';
import { 
  Truck, 
  Shield, 
  Heart 
} from '@phosphor-icons/react';

const FeaturesBar: React.FC = () => {
  const features = [
    {
      icon: <Truck size={24} weight="bold" className="text-green-600" />,
      title: "Fast Delivery",
      description: "Same day delivery available",
      bgColor: "bg-green-100"
    },
    {
      icon: <Shield size={24} weight="bold" className="text-blue-600" />,
      title: "Secure Payments",
      description: "Blockchain-powered escrow",
      bgColor: "bg-blue-100"
    },
    {
      icon: <Heart size={24} weight="bold" className="text-purple-600" />,
      title: "Support Local",
      description: "Empowering communities",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="bg-white py-6 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;