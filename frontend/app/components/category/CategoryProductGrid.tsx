// app/components/category/CategoryProductGrid.tsx
'use client';

import React, { useState } from 'react';
import ProductCard from '@/app/components/product/ProductCard';
import { Button } from '@/app/components/ui/Button';
import { 
  SquaresFour, 
  List,
  CaretDown,
  MagnifyingGlass
} from '@phosphor-icons/react';
import { Product, CategoryData } from '@/types';

interface CategoryProductGridProps {
  products: Product[];
  categoryData: CategoryData;
}

const CategoryProductGrid: React.FC<CategoryProductGridProps> = ({ 
  products = [], 
  categoryData 
}) => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const productsPerPage = 12;

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name: A to Z' }
  ];

  // Early return if no categoryData
  if (!categoryData) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Category not found</h3>
        <p className="text-gray-600">The category you're looking for doesn't exist.</p>
      </div>
    );
  }

  // Safely filter products
  const getFilteredProducts = () => {
    if (!Array.isArray(products)) return [];
    
    return products.filter(product => {
      if (!product) return false;
      
      const productName = product.name || '';
      const productDescription = product.description || '';
      const sellerName = product.seller?.name || '';
      const query = searchQuery.toLowerCase();
      
      return (
        productName.toLowerCase().includes(query) ||
        productDescription.toLowerCase().includes(query) ||
        sellerName.toLowerCase().includes(query)
      );
    });
  };

  const filteredProducts = getFilteredProducts();

  // Safely sort products
  const getSortedProducts = () => {
    const productsToSort = [...filteredProducts];
    
    return productsToSort.sort((a, b) => {
      if (!a || !b) return 0;
      
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'newest':
          return (b.id || 0) - (a.id || 0);
        default:
          return 0;
      }
    });
  };

  const sortedProducts = getSortedProducts();

  // Safe pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / productsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * productsPerPage;
  const endIndex = Math.min(sortedProducts.length, startIndex + productsPerPage);
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product?.name || 'Unknown product');
  };

  const handlePageChange = (page: number) => {
    const safePage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(safePage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <MagnifyingGlass 
              size={20} 
              weight="bold" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder={`Search in ${categoryData.name}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Results Count */}
          <div className="text-gray-600">
            Showing {Math.max(0, startIndex + 1)}-{endIndex} of {sortedProducts.length} products
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <CaretDown 
                size={16} 
                weight="bold" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
              />
            </div>

            {/* View Toggle */}
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
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <div className={`grid gap-6 ${
          viewType === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {paginatedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlass size={32} weight="light" className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No products match "${searchQuery}" in ${categoryData.name}` 
              : `No products available in ${categoryData.name} yet`
            }
          </p>
          {searchQuery && (
            <Button variant="outline" onClick={clearSearch}>
              Clear Search
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && paginatedProducts.length > 0 && (
        <div className="flex items-center justify-center space-x-2 py-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
          >
            Previous
          </Button>
          
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isCurrentPage = page === safeCurrentPage;
            
            // Show first page, last page, current page, and pages around current
            if (
              page === 1 || 
              page === totalPages || 
              (page >= safeCurrentPage - 1 && page <= safeCurrentPage + 1)
            ) {
              return (
                <Button
                  key={page}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              );
            } else if (page === safeCurrentPage - 2 || page === safeCurrentPage + 2) {
              return <span key={page} className="text-gray-400">...</span>;
            }
            return null;
          })}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryProductGrid;