import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { 
  Plus, 
  PencilSimple,
  Star,
  Eye,
  Trash,
  Package
} from '@phosphor-icons/react';
import { products } from '@/lib/data';

const ProductList: React.FC = () => {
  const handleEditProduct = (productId: number) => {
    console.log('Edit product:', productId);
    // Handle edit product logic
  };

  const handleDeleteProduct = (productId: number) => {
    console.log('Delete product:', productId);
    // Handle delete product logic
  };

  const handleViewProduct = (productId: number) => {
    window.open(`/product/${productId}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Your Products</h3>
        <Link href="/merchant/upload">
          <Button className="flex items-center space-x-2">
            <Plus size={16} weight="bold" />
            <span>Add New</span>
          </Button>
        </Link>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="p-4 hover:shadow-md transition-shadow">
            {/* Product Image Placeholder */}
            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Product Image</span>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">
                  {product.name}
                </h4>
                <div className="flex items-center space-x-1 ml-2">
                  <button 
                    onClick={() => handleViewProduct(product.id)}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                    title="View Product"
                  >
                    <Eye size={16} weight="bold" />
                  </button>
                  <button 
                    onClick={() => handleEditProduct(product.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    title="Edit Product"
                  >
                    <PencilSimple size={16} weight="bold" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    title="Delete Product"
                  >
                    <Trash size={16} weight="bold" />
                  </button>
                </div>
              </div>
              
              <div className="text-lg font-bold text-gray-900">
                ₦{product.price.toLocaleString()}
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Stock: {product.quantity}</span>
                <span className="flex items-center">
                  <Star 
                    size={12} 
                    weight="fill" 
                    className="text-yellow-400 mr-1" 
                  />
                  {product.rating} ({product.reviews})
                </span>
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Category: {product.category}</span>
                  <span className={`px-2 py-1 rounded-full font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex-1 text-xs"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} weight="light" className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first product to the marketplace.</p>
          <Link href="/merchant/upload">
            <Button className="inline-flex items-center space-x-2">
              <Plus size={16} weight="bold" />
              <span>Add Your First Product</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {products.length} of {products.length} products
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;