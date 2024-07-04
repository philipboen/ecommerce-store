import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

export const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                return toast.error("Item already in cart");
            }

            set({ items: [...get().items, data] });
            toast.success("Item added to cart");
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] });
            toast.success("Item removed from cart");
        },
        removeAll: () => {
            set({ items: [] });
            toast.success("All items removed from cart");
        },
    }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
