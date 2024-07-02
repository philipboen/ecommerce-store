"use client";

import { useState } from "react";
import { Color, Size } from "@/types";
import { Button } from "@/components/shared/button";
import { Plus, X } from "lucide-react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IconButton } from "@/components/shared/icon-button";
import { Filter } from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

export const MobileFilters = ({ sizes, colors }: MobileFiltersProps) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        className="flex items-center gap-x-2 text-sm lg:hidden"
        onClick={onOpen}
      >
        Filters
        <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} onClick={onClose} />} />
            </div>
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
