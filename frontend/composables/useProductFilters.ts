"use client";

import { useState } from "react";

export function useProductFilters() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const resetPrice = () => {
    setMinPrice(0);
    setMaxPrice(500);
  };

  return {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    resetPrice,
  };
}