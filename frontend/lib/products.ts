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
    image: "/images/products/leather-tote.jpg",
    discount: 15,
    category: "clothing",
  },
  {
    id: 11,
    name: "Noise Cancelling Earbuds",
    description: "Compact wireless earbuds with active noise cancellation.",
    price: 149.99,
    image: "/images/products/earbuds.jpg",
    discount: 25,
    category: "electronics",
  },
  {
    id: 12,
    name: "Smart Fitness Tracker",
    description: "Track daily activity, heart rate, sleep, and workouts.",
    price: 79.99,
    image: "/images/products/fitness-tracker.jpg",
    discount: 20,
    category: "electronics",
  },
  {
    id: 13,
    name: "Oversized Cotton Hoodie",
    description: "Soft oversized hoodie designed for everyday comfort.",
    price: 64.99,
    image: "/images/products/hoodie.jpg",
    discount: 30,
    category: "clothing",
  },
  {
    id: 14,
    name: "Classic Denim Jacket",
    description: "Timeless denim jacket with a comfortable relaxed fit.",
    price: 89.99,
    image: "/images/products/denim-jacket.jpg",
    category: "clothing",
  },
  {
    id: 15,
    name: "Minimalist Desk Chair",
    description: "Modern ergonomic chair designed for home and office use.",
    price: 189.99,
    image: "/images/products/desk-chair.jpg",
    discount: 10,
    category: "home-garden",
  },
  {
    id: 16,
    name: "Ceramic Dinner Set",
    description: "Modern ceramic dinnerware set for everyday dining.",
    price: 85.0,
    image: "/images/products/dinner-set.jpg",
    discount: 40,
    category: "home-garden",
  },
  {
    id: 17,
    name: "Modern Wall Clock",
    description: "Minimal wall clock with a clean contemporary design.",
    price: 39.99,
    image: "/images/products/wall-clock.jpg",
    category: "home-garden",
  },
  {
    id: 18,
    name: "Indoor Plant Pot",
    description: "Decorative ceramic plant pot for modern interiors.",
    price: 29.99,
    image: "/images/products/plant-pot.jpg",
    discount: 15,
    category: "home-garden",
  },
  {
    id: 19,
    name: "Wireless Charging Stand",
    description: "Fast wireless charging stand for compatible smartphones.",
    price: 49.99,
    image: "/images/products/charging-stand.jpg",
    discount: 20,
    category: "electronics",
  },
  {
    id: 20,
    name: "4K Computer Monitor",
    description:
      "Crisp 4K display designed for productivity and entertainment.",
    price: 349.99,
    image: "/images/products/monitor.jpg",
    discount: 25,
    category: "electronics",
  },
  {
    id: 21,
    name: "Slim Laptop Sleeve",
    description: "Protective padded laptop sleeve with a minimalist design.",
    price: 39.99,
    image: "/images/products/laptop-sleeve.jpg",
    category: "electronics",
  },
  {
    id: 22,
    name: "Classic Sunglasses",
    description: "Lightweight sunglasses with a timeless everyday style.",
    price: 54.99,
    image: "/images/products/sunglasses.jpg",
    discount: 10,
    category: "clothing",
  },
  {
    id: 23,
    name: "Casual Cotton T-Shirt",
    description: "Soft breathable cotton T-shirt with a relaxed fit.",
    price: 29.99,
    image: "/images/products/tshirt.jpg",
    category: "clothing",
  },
  {
    id: 24,
    name: "Modern Floor Lamp",
    description: "Slim floor lamp providing warm light for modern spaces.",
    price: 109.99,
    image: "/images/products/floor-lamp.jpg",
    discount: 30,
    category: "home-garden",
  },
];

export function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}
