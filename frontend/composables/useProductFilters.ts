"use client";

import { useState } from "react";

export function useProductFilters(initialCategory = "all") {
  // Price filter
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  // Availability filter
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [category, setCategory] = useState(initialCategory);
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
    setCategory("all");
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

    // Rating
    minRating,
    setMinRating,

    // Category
    category,
    setCategory,

    // Discount
    minDiscount,
    setMinDiscount,

    // Reset
    resetPrice,
    resetAvailability,
    resetFilters,
  };
}