"use client";

import axios from "axios";
import { useCart } from "@/hooks/use-cart";
import React, { useState, useEffect } from "react";
import { Field, Input, Label } from "@headlessui/react";
import { Button } from "@/components/shared/button";

import clsx from "clsx";
import { CurrencyConverter } from "./currency-converter";
import toast from "react-hot-toast";

const MpesaPaymentPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const cart = useCart();
  const items = useCart((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const fullName = `${firstName} ${lastName}`;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/mpesa`,
        {
          name: fullName,
          phoneNumber,
          productIds: items.map((item) => item.id),
        }
      );

      if (response.data.ResponseCode === "0") {
        toast.success("Mpesa prompt sent to your phone.");
      } else {
        toast.error(
          `Payment initiation failed: ${response.data.ResponseDescription}`
        );
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-6xl">
        <div className="mt-12 gap-x-12 lg:grid lg:grid-cols-10 lg:items-start">
          <div className="space-y-4 lg:col-span-3">
            <h2 className="font-serif text-xl font-semibold">Orders</h2>
            <ul className="space-y-2">
              {cart.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-stone-800">
                    {item.name}
                  </h3>
                  <h3 className="text-sm font-semibold text-stone-800">
                    <CurrencyConverter value={item.price} />
                  </h3>
                </li>
              ))}
            </ul>
            <hr className="mt-8 w-full border-neutral-800" />
            <div className="mt-4 flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-800">Total</h3>
              <h3 className="font-serif font-bold text-stone-800">
                <CurrencyConverter value={totalPrice} />
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-between"></div>
          </div>
          <div className="h-full w-px bg-neutral-800 lg:col-span-1" />
          <div className="lg:col-span-4">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="flex items-center justify-start gap-4">
                <Field className="flex-1">
                  <Label className="text-sm/6 font-medium">First Name</Label>
                  <Input
                    className={clsx(
                      "mt-3 block w-full rounded-lg border border-neutral-500 bg-neutral-300/50 px-3 py-1.5 text-sm/6",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-800/25"
                    )}
                    disabled={loading}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field>
                <Field className="flex-1">
                  <Label className="text-sm/6 font-medium">Last Name</Label>
                  <Input
                    className={clsx(
                      "mt-3 block w-full rounded-lg border border-neutral-500 bg-neutral-300/50 px-3 py-1.5 text-sm/6",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-800/25"
                    )}
                    disabled={loading}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>
              </div>
              <Field>
                <Label className="text-sm/6 font-medium">Phone Number</Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full rounded-lg border border-neutral-500 bg-neutral-300/50 px-3 py-1.5 text-sm/6",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-800/25"
                  )}
                  disabled={loading}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Field>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Processing..." : "Pay with Mpesa"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MpesaPaymentPage;
