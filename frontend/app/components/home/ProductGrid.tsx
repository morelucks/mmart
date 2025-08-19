// app/components/home/ProductGrid.tsx
'use client';

import React, { useState } from 'react';
import ProductCard from '@/app/components/product/ProductCard';
import { Button } from '@/app/components/ui/Button';
import { 
  Funnel, 
  SquaresFour, 
  List,
  CaretDown 
} from '@phosphor-icons/react';
import { products } from '@/lib/data';
import { Product } from '@/types';

const ProductGrid: React.FC = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', product.name);
    // Add cart logic here
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Featured Products</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
            <button 
              onClick={() => setViewType('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewType === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <SquaresFour size={20} weight="bold" />
            </button>
            <button 
              onClick={() => setViewType('list')}
              className={`p-2 rounded-full transition-colors ${
                viewType === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List size={20} weight="bold" />
            </button>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
          >
            <Funnel size={16} weight="bold" />
            <span>Filter</span>
            <CaretDown size={16} weight="bold" />
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${
        viewType === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </section>
  );
};

export default ProductGrid;