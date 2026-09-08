export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  discount?: number;
  category: string;
};

export const products: Product[] = [
  {
    id: 10,
    name: "Leather Tote Bag",
    description: "Elegant leather tote bag with a spacious everyday design.",
    price: 153.0,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    discount: 15,
    category: "clothing",
  },
  {
    id: 11,
    name: "Noise Cancelling Earbuds",
    description: "Compact wireless earbuds with active noise cancellation.",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800",
    discount: 25,
    category: "electronics",
  },
  {
    id: 12,
    name: "Smart Fitness Tracker",
    description: "Track daily activity, heart rate, sleep, and workouts.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    discount: 20,
    category: "electronics",
  },
  {
    id: 13,
    name: "Oversized Cotton Hoodie",
    description: "Soft oversized hoodie designed for everyday comfort.",
    price: 64.99,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    discount: 30,
    category: "clothing",
  },
  {
    id: 14,
    name: "Classic Denim Jacket",
    description: "Timeless denim jacket with a comfortable relaxed fit.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800",
    category: "clothing",
  },
  {
    id: 15,
    name: "Minimalist Desk Chair",
    description: "Modern ergonomic chair designed for home and office use.",
    price: 189.99,
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800",
    discount: 10,
    category: "home-garden",
  },
  {
    id: 16,
    name: "Ceramic Dinner Set",
    description: "Modern ceramic dinnerware set for everyday dining.",
    price: 85.0,
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800",
    discount: 40,
    category: "home-garden",
  },
  {
    id: 17,
    name: "Modern Wall Clock",
    description: "Minimal wall clock with a clean contemporary design.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800",
    category: "home-garden",
  },
  {
    id: 18,
    name: "Indoor Plant Pot",
    description: "Decorative ceramic plant pot for modern interiors.",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    discount: 15,
    category: "home-garden",
  },
  {
    id: 19,
    name: "Wireless Charging Stand",
    description: "Fast wireless charging stand for compatible smartphones.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800",
    discount: 20,
    category: "electronics",
  },
  {
    id: 20,
    name: "4K Computer Monitor",
    description:
      "Crisp 4K display designed for productivity and entertainment.",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    discount: 25,
    category: "electronics",
  },
  {
    id: 21,
    name: "Slim Laptop Sleeve",
    description: "Protective padded laptop sleeve with a minimalist design.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    category: "electronics",
  },
  {
    id: 22,
    name: "Classic Sunglasses",
    description: "Lightweight sunglasses with a timeless everyday style.",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    discount: 10,
    category: "clothing",
  },
  {
    id: 23,
    name: "Casual Cotton T-Shirt",
    description: "Soft breathable cotton T-shirt with a relaxed fit.",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    category: "clothing",
  },
  {
    id: 24,
    name: "Modern Floor Lamp",
    description: "Slim floor lamp providing warm light for modern spaces.",
    price: 109.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    discount: 30,
    category: "home-garden",
  },
];

export function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string) {
  return products.filter(
    (product) => product.category === category
  );
}