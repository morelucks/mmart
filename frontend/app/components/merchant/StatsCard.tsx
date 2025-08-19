// app/components/merchant/StatsCard.tsx
import React from 'react';
import { Card, CardContent } from '@/app/components/ui/Card';
import { TrendUp, TrendDown } from '@phosphor-icons/react';
import { MerchantStat } from '@/types';

interface StatsCardProps {
  stat: MerchantStat;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  const isPositive = stat.positive;
  
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendUp size={16} weight="bold" className="text-green-600" />
            ) : (
              <TrendDown size={16} weight="bold" className="text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;