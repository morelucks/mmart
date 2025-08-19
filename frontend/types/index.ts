// types/index.ts
import { IconProps } from '@phosphor-icons/react';

export interface Seller {
  name: string;
  location: string;
  rating: number;
  verified: boolean;
  joinDate: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  seller: Seller;
  description: string;
  features: string[];
  category: string;
  inStock: boolean;
  quantity: number;
  badge: string;
  discount?: number;
}

// Category with icon (client-side)
export interface Category {
  name: string;
  icon: React.ComponentType<IconProps>;
  count: string;
  slug: string;
}

// Category without icon (server-safe)
export interface CategoryData {
  name: string;
  count: string;
  slug: string;
}

export interface MerchantStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  min?: string;
  disabled?: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  quantity: string;
  features: string[];
  images: string[];
}