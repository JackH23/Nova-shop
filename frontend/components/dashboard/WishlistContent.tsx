"use client";

import PageContainer from "@/components/common/PageContainer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/lib/products";

const wishlistItems: Product[] = [
  {
    id: 1,
    name: "Aura Noise-Cancelling Headphones",
    price: 299,
    image: "/images/products/headphones.jpg",
    stock: 10,
  },
  {
    id: 2,
    name: "Kanso Matte Ceramic Mug",
    price: 24,
    image: "/images/products/mug.jpg",
    stock: 20,
  },
  {
    id: 3,
    name: "Nimbus Mechanical Keyboard",
    price: 145,
    image: "/images/products/keyboard.jpg",
    stock: 0,
  },
  {
    id: 4,
    name: "Lumina Desk Lamp",
    price: 89,
    image: "/images/products/lamp.jpg",
    stock: 3,
  },
];

export default function WishlistContent() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <DashboardSidebar />

        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-slate-950">
            Your Wishlist
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {wishlistItems.length} items saved for later.
          </p>

          <div className="mt-4 border-t border-slate-200" />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {wishlistItems.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
            />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}