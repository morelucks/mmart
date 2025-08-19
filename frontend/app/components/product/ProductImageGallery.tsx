// app/components/product/ProductImageGallery.tsx
'use client';

import React, { useState } from 'react';
import { CaretLeft, CaretRight, MagnifyingGlassPlus } from '@phosphor-icons/react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-200 rounded-2xl overflow-hidden group">
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <span className="text-gray-400 text-lg block mb-2">Main Product Image</span>
            <span className="text-gray-300 text-sm">({selectedImage + 1} of {images.length})</span>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </>
        )}

        {/* Zoom Button */}
        <button
          onClick={handleImageClick}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MagnifyingGlassPlus size={20} weight="bold" />
        </button>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-gray-200 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index 
                  ? 'border-blue-600 ring-2 ring-blue-200 scale-95' 
                  : 'border-transparent hover:border-gray-300 hover:scale-95'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-400 font-medium">{index + 1}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Image Details */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 mb-2">Image Gallery</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Total Images:</span> {images.length}
          </div>
          <div>
            <span className="font-medium">Current:</span> Image {selectedImage + 1}
          </div>
        </div>
        {productName && (
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Product:</span> {productName}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <div className="bg-white rounded-2xl p-4">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-gray-400 text-2xl block mb-2">Zoomed View</span>
                  <span className="text-gray-300">High Resolution Image</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;