"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Currency } from "@/components/shared/currency";
import { Button } from "@/components/shared/button";
import { useCart } from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { PaymentMethod } from "./payment-method";

export const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [mpesaEnabled, setMpesaEnabled] = useState(true);
  const [creditCardEnabled, setCreditCardEnabled] = useState(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const baseUrl = window.location.origin;
    if (mpesaEnabled) {
      window.location.href = `${baseUrl}/cart/payment-method/mpesa`;
    } else if (creditCardEnabled) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
        }
      );

      window.location = response.data.url;
    } else {
      toast.error("Please select a payment method.");
      throw new Error("Please select a payment method.");
    }
  };

  const handleMpesaChange = (enabled: boolean) => {
    setMpesaEnabled(enabled);
    if (enabled) {
      setCreditCardEnabled(false);
    }
  };

  const handleCreditCardChange = (enabled: boolean) => {
    setCreditCardEnabled(enabled);
    if (enabled) {
      setMpesaEnabled(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8">
      <h2 className="font-serif text-lg font-semibold text-gray-900">
        Order Summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <p className="text-sm text-gray-500 max-sm:text-center">
          Please choose a payment method before proceeding to checkout.
        </p>
        <PaymentMethod
          mpesaEnabled={mpesaEnabled}
          creditCardEnabled={creditCardEnabled}
          onMpesaChange={handleMpesaChange}
          onCreditCardChange={handleCreditCardChange}
        />
      </div>
      <Button
        disabled={items.length === 0 || (!mpesaEnabled && !creditCardEnabled)}
        onClick={onCheckout}
        className="mt-6 w-full"
      >
        Checkout
      </Button>
    </div>
  );
};
