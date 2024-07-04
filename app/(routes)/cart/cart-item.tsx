"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "@/types";
import { IconButton } from "@/components/shared/icon-button";
import { Currency } from "@/components/shared/currency";
import { useCart } from "@/hooks/use-cart";

interface CartItemProps {
  data: Product;
}

export const CartItem = ({ data }: CartItemProps) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex border-b py-6">
      <div className="relative size-24 overflow-hidden rounded-md sm:size-48">
        <Image
          fill
          src={data.images[0].url}
          alt="product image"
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute right-0 top-0 z-10">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="mt-1 flex space-x-4 text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <div className="h-[85%] w-px bg-gray-200" />
            <p className="text-gray-500">{data.size.name}</p>
          </div>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};
