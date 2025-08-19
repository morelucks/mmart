// components/product/ProductCard.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Heart, 
  Star, 
  MapPin 
} from '@phosphor-icons/react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
    console.log('Added to cart:', product.name);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100">
        <div className="relative">
          <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-t-2xl">
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-2xl">
              <span className="text-gray-400 text-sm">Product Image</span>
            </div>
          </div>
          
          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{product.discount}%
            </div>
          )}
          
          <button 
            onClick={handleLike}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <Heart 
              size={16} 
              weight={isLiked ? "fill" : "regular"}
              className={isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"} 
            />
          </button>
          
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {product.badge}
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h4>
          
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  weight={i < Math.floor(product.rating) ? "fill" : "regular"}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mb-3">
            <div>By {product.seller.name}</div>
            <div className="flex items-center mt-1">
              <MapPin size={10} weight="bold" className="mr-1" />
              {product.seller.location}
            </div>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;