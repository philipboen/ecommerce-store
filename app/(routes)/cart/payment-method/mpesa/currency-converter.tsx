"use client";

import React, { useEffect, useState } from "react";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KES",
});

interface CurrencyProps {
  value?: string | number;
}

export const CurrencyConverter: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="font-semibold">{priceFormatter.format(Number(value) * 129)}</div>
  );
};
