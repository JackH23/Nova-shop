"use client";

import { useState } from "react";

export function useProductFilters() {
  // Price filter
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  // Availability filter
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);

  // Category filter
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // Discount filter
  const [minDiscount, setMinDiscount] = useState(20);

  // Rating filter
  const [minRating, setMinRating] = useState(0);

  // Reset price
  const resetPrice = () => {
    setMinPrice(0);
    setMaxPrice(500);
  };

  // Reset availability
  const resetAvailability = () => {
    setInStock(false);
    setOnSale(false);
  };

  // Reset all filters
  const resetFilters = () => {
    resetPrice();
    resetAvailability();
    setCategoryId(null);
    setMinDiscount(20);
    setMinRating(0);
  };

  return {
    // Price
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,

    // Availability
    inStock,
    onSale,
    setInStock,
    setOnSale,

    // Category
    categoryId,
    setCategoryId,

    // Discount
    minDiscount,
    setMinDiscount,

    // Rating
    minRating,
    setMinRating,

    // Reset
    resetPrice,
    resetAvailability,
    resetFilters,
  };
}