import { Product, MerchantStat } from '@/types';

// Categories without icons (server-safe)
export const categoriesData = [
  { name: 'Grains & Foods', count: '2.5k+', slug: 'grains-foods' },
  { name: 'Beverages', count: '800+', slug: 'beverages' },
  { name: 'Crafts & Art', count: '1.2k+', slug: 'crafts-art' },
  { name: 'Fashion', count: '950+', slug: 'fashion' },
  { name: 'Home & Decor', count: '600+', slug: 'home-decor' }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Ofada Rice',
    price: 4500,
    originalPrice: 5200,
    images: ['/images/ofada-rice-1.jpg', '/images/ofada-rice-2.jpg', '/images/ofada-rice-3.jpg'],
    rating: 4.8,
    reviews: 124,
    seller: {
      name: 'Mama Kudi Foods',
      location: 'Lagos',
      rating: 4.9,
      verified: true,
      joinDate: 'March 2023'
    },
    description: 'Premium quality Ofada rice sourced directly from local farmers. This aromatic rice is perfect for traditional Nigerian dishes and offers exceptional taste and nutritional value.',
    features: ['Locally sourced', 'Chemical-free', 'High nutritional value', 'Authentic taste'],
    category: 'Grains & Foods',
    inStock: true,
    quantity: 50,
    badge: 'Verified',
    discount: 13
  },
  {
    id: 2,
    name: 'Handwoven Ankara Dress',
    price: 12000,
    originalPrice: 15000,
    images: ['/images/ankara-dress-1.jpg', '/images/ankara-dress-2.jpg'],
    rating: 4.9,
    reviews: 89,
    seller: {
      name: 'Adunni Fabrics',
      location: 'Ibadan',
      rating: 4.8,
      verified: true,
      joinDate: 'January 2023'
    },
    description: 'Beautiful handwoven Ankara dress crafted by skilled artisans. Features traditional patterns with modern styling for the contemporary African woman.',
    features: ['Handwoven', 'Premium fabric', 'Custom sizing available', 'Traditional patterns'],
    category: 'Fashion',
    inStock: true,
    quantity: 25,
    badge: 'Top Rated',
    discount: 20
  },
  {
    id: 3,
    name: 'Fresh Tiger Nut Drink',
    price: 800,
    images: ['/images/tiger-nut-drink.jpg'],
    rating: 4.7,
    reviews: 156,
    seller: {
      name: 'Healthy Drinks Co.',
      location: 'Kano',
      rating: 4.6,
      verified: true,
      joinDate: 'February 2023'
    },
    description: 'Refreshing and nutritious tiger nut drink made from carefully selected tiger nuts. Rich in vitamins and minerals, perfect for a healthy lifestyle.',
    features: ['100% Natural', 'No preservatives', 'Rich in nutrients', 'Fresh daily'],
    category: 'Beverages',
    inStock: true,
    quantity: 100,
    badge: 'Fresh'
  },
  {
    id: 4,
    name: 'Beaded Jewelry Set',
    price: 3500,
    originalPrice: 4200,
    images: ['/images/beaded-jewelry.jpg'],
    rating: 4.6,
    reviews: 67,
    seller: {
      name: 'Yoruba Crafts',
      location: 'Ogun',
      rating: 4.7,
      verified: true,
      joinDate: 'April 2023'
    },
    description: 'Exquisite handmade beaded jewelry set featuring traditional Yoruba designs. Each piece is carefully crafted by skilled artisans.',
    features: ['Handmade', 'Traditional designs', 'Quality beads', 'Unique patterns'],
    category: 'Crafts & Art',
    inStock: true,
    quantity: 15,
    badge: 'Handmade',
    discount: 17
  }
];

export const merchantStats: MerchantStat[] = [
  { label: 'Total Sales', value: '₦1,245,000', change: '+12%', positive: true },
  { label: 'Products Listed', value: '24', change: '+3', positive: true },
  { label: 'Orders This Month', value: '156', change: '+24%', positive: true },
  { label: 'Customer Rating', value: '4.8', change: '+0.2', positive: true }
];