// lib/categories.tsx
'use client';

import { 
  Grains, 
  Coffee, 
  Palette, 
  Dress, 
  House 
} from '@phosphor-icons/react';
import { Category } from '@/types';
import { categoriesData } from './data';

// Client-side categories with icons
export const categories: Category[] = [
  { ...categoriesData[0], icon: Grains },
  { ...categoriesData[1], icon: Coffee },
  { ...categoriesData[2], icon: Palette },
  { ...categoriesData[3], icon: Dress },
  { ...categoriesData[4], icon: House }
];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string) => {
  return categories.find(c => c.slug === slug);
};

// Helper function to get category icon component
export const getCategoryIcon = (categoryName: string) => {
  const category = categories.find(c => c.name === categoryName);
  return category?.icon;
};