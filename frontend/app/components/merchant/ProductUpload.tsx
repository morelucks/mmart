"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';
import { 
  ArrowLeft,
  Image as ImageIcon,
  Camera,
  CurrencyCircleDollar,
  Package,
  Plus,
  X
} from '@phosphor-icons/react';
import { categoriesData } from '@/lib/data';
import { ProductFormData } from '@/types';

const ProductUpload: React.FC = () => {
  const router = useRouter();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [productData, setProductData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    quantity: '',
    features: [''],
    images: []
  });

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...productData.features];
    newFeatures[index] = value;
    setProductData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setProductData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = productData.features.filter((_, i) => i !== index);
    setProductData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('Files dropped:', e.dataTransfer.files);
      // Handle file upload logic here
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product data:', productData);
    // Handle form submission
    router.push('/merchant/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Fill in the details to list your product</p>
          </div>
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} weight="bold" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Upload Form */}
        <Card className="p-8">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Product Images */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">
                  Product Images
                </label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <ImageIcon size={24} weight="bold" className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">Upload product images</p>
                      <p className="text-sm text-gray-600">
                        Drag and drop images here, or click to browse
                      </p>
                    </div>
                    <Button 
                      type="button"
                      className="inline-flex items-center space-x-2"
                    >
                      <Camera size={20} weight="bold" />
                      <span>Choose Files</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Product Name *
                  </label>
                  <Input
                    type="text"
                    value={productData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category *
                  </label>
                  <select
                    value={productData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categoriesData.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description *
                </label>
                <textarea
                  value={productData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your product in detail..."
                  required
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-900 mb-2">
                    <CurrencyCircleDollar size={16} weight="bold" className="mr-1" />
                    Selling Price (₦) *
                  </label>
                  <Input
                    type="number"
                    value={productData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Original Price (₦)
                  </label>
                  <Input
                    type="number"
                    value={productData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional: for showing discounts</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-900 mb-2">
                    <Package size={16} weight="bold" className="mr-1" />
                    Quantity in Stock *
                  </label>
                  <Input
                    type="number"
                    value={productData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">
                  Key Features
                </label>
                <div className="space-y-3">
                  {productData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter a key feature"
                        className="flex-1"
                      />
                      {productData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <X size={20} weight="bold" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <Plus size={20} weight="bold" />
                    <span>Add another feature</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                >
                  Save as Draft
                </Button>
                <Button type="submit">
                  Publish Product
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductUpload;