"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/shared/container";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./cart-item";
import { Summary } from "./summary";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-black">
            Shopping Cart
          </h1>
          <div className="mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No items added to cart</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            {cart.items.length > 0 && <Summary />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
