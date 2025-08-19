// app/components/category/CategoryFilters.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { 
  Funnel, 
  Star, 
  MapPin, 
  CurrencyCircleDollar,
  X
} from '@phosphor-icons/react';
import { CategoryData } from '@/types';

interface CategoryFiltersProps {
  categoryData: CategoryData;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categoryData }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const locations = ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Ogun'];
  
  const priceRanges = [
    { label: 'Under ₦1,000', min: 0, max: 1000 },
    { label: '₦1,000 - ₦5,000', min: 1000, max: 5000 },
    { label: '₦5,000 - ₦10,000', min: 5000, max: 10000 },
    { label: '₦10,000 - ₦20,000', min: 10000, max: 20000 },
    { label: 'Over ₦20,000', min: 20000, max: Infinity }
  ];

  const handlePriceRangeClick = (range: { min: number; max: number; label: string }) => {
    setPriceRange({ 
      min: range.min.toString(), 
      max: range.max === Infinity ? '' : range.max.toString() 
    });
    addActiveFilter(`Price: ${range.label}`);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    addActiveFilter(`Rating: ${rating}+ stars`);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    addActiveFilter(`Location: ${location}`);
  };

  const addActiveFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters(prev => [...prev, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
    
    // Reset the corresponding state
    if (filter.startsWith('Price:')) {
      setPriceRange({ min: '', max: '' });
    } else if (filter.startsWith('Rating:')) {
      setSelectedRating(null);
    } else if (filter.startsWith('Location:')) {
      setSelectedLocation('');
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setPriceRange({ min: '', max: '' });
    setSelectedRating(null);
    setSelectedLocation('');
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Funnel size={20} weight="bold" className="text-blue-600" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-sm">Active Filters</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  <span>{filter}</span>
                  <button onClick={() => removeFilter(filter)}>
                    <X size={12} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <CurrencyCircleDollar size={18} weight="bold" className="text-green-600" />
            <span>Price Range</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="text-sm"
            />
          </div>
          
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => handlePriceRangeClick(range)}
                className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
              >
                {range.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Star size={18} weight="bold" className="text-yellow-500" />
            <span>Customer Rating</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingClick(rating)}
              className={`flex items-center space-x-2 w-full text-left py-1 px-2 rounded transition-colors ${
                selectedRating === rating ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    weight={i < rating ? "fill" : "regular"}
                    className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm">{rating}+ stars</span>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <MapPin size={18} weight="bold" className="text-red-500" />
            <span>Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => handleLocationChange(location)}
              className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                selectedLocation === location ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {location}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button className="w-full">
        Apply Filters
      </Button>
    </div>
  );
};

export default CategoryFilters;