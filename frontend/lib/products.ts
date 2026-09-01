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
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-fidelity audio with active noise cancellation.",
    price: 249.99,
    image: "/images/products/headphones.jpg",
    discount: 40,
    category: "electronics",
  },
  {
    id: 2,
    name: "Minimalist Smartwatch",
    description: "Track your fitness and stay connected in style.",
    price: 199.0,
    image: "/images/products/smartwatch.jpg",
    category: "electronics",
  },
  {
    id: 3,
    name: "Ceramic Artisan Mug",
    description: "Handcrafted ceramic mug for your daily brew.",
    price: 24.0,
    image: "/images/products/mug.jpg",
    category: "home-garden",
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    description: "Powerful wireless sound in a compact portable design.",
    price: 89.99,
    image: "/images/products/speaker.jpg",
    discount: 15,
    category: "electronics",
  },
  {
    id: 5,
    name: "Classic Leather Backpack",
    description: "A stylish everyday backpack with spacious storage.",
    price: 129.99,
    image: "/images/products/backpack.jpg",
    category: "clothing",
  },
  {
    id: 6,
    name: "Modern Table Lamp",
    description: "Minimal table lamp with warm ambient lighting.",
    price: 59.99,
    image: "/images/products/lamp.jpg",
    category: "home-garden",
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    description: "Responsive mechanical keyboard for work and gaming.",
    price: 119.99,
    image: "/images/products/keyboard.jpg",
    discount: 20,
    category: "electronics",
  },
  {
    id: 8,
    name: "Wireless Gaming Mouse",
    description: "Lightweight wireless mouse with precise tracking.",
    price: 69.99,
    image: "/images/products/mouse.jpg",
    category: "electronics",
  },
  {
    id: 9,
    name: "Running Sneakers",
    description: "Comfortable lightweight sneakers for everyday activity.",
    price: 94.99,
    image: "/images/products/sneakers.jpg",
    discount: 10,
    category: "clothing",
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