// components/product/ProductDetail.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import ProductImageGallery from './ProductImageGallery';
import { 
  ArrowLeft, 
  Heart, 
  ShareNetwork, 
  Plus, 
  Minus, 
  Star, 
  MapPin,
  ChatCircle
} from '@phosphor-icons/react';
import { Product } from '@/types';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Add to cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Products</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      weight={i < Math.floor(product.rating) ? "fill" : "regular"}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
                </div>
                <span className="text-green-600 text-sm font-medium">✓ In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-full">
                  <button 
                    onClick={() => handleQuantityChange('decrease')}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} weight="bold" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange('increase')}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart 
                    size={20} 
                    weight={isLiked ? "fill" : "bold"}
                    className={isLiked ? "text-red-500" : ""} 
                  />
                </Button>
                <Button variant="outline" size="lg">
                  <ShareNetwork size={20} weight="bold" />
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{product.seller.name}</span>
                      {product.seller.verified && (
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <MapPin size={12} weight="bold" className="mr-1" />
                        {product.seller.location}
                      </span>
                      <span>Joined {product.seller.joinDate}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          weight={i < Math.floor(product.seller.rating) ? "fill" : "regular"}
                          className={i < Math.floor(product.seller.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({product.seller.rating})</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ChatCircle size={16} weight="bold" className="mr-1" />
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;