import Image from "next/image";
import MpesaLogo from "@/public/assets/mpesa.png";
import CreditCardsLogo from "@/public/assets/credit-cards.png";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";

interface PaymentMethodProps {
  mpesaEnabled: boolean;
  creditCardEnabled: boolean;
  onMpesaChange: (enabled: boolean) => void;
  onCreditCardChange: (enabled: boolean) => void;
}

export const PaymentMethod = ({
  mpesaEnabled,
  creditCardEnabled,
  onMpesaChange,
  onCreditCardChange,
}: PaymentMethodProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex w-full items-center justify-between rounded-lg bg-zinc-400/40 shadow-sm ring-2">
        <Image
          src={MpesaLogo}
          alt="Mpesa"
          width={100}
          height={50}
          className="object-cover"
        />
        <Checkbox
          checked={mpesaEnabled}
          onChange={() => onMpesaChange(!mpesaEnabled)}
          className="group mr-4 size-6 cursor-pointer rounded-md bg-white p-1 ring-1 ring-inset ring-black/60 data-[checked]:bg-white"
        >
          <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
        </Checkbox>
      </div>
      <div className="flex w-full items-center justify-between rounded-lg bg-zinc-400/40 py-3.5 shadow-sm ring-2">
        <Image
          src={CreditCardsLogo}
          alt="Mpesa"
          width={120}
          height={50}
          className="ml-2 object-cover"
        />
        <Checkbox
          checked={creditCardEnabled}
          onChange={() => onCreditCardChange(!creditCardEnabled)}
          className="group mr-4 size-6 shrink-0 cursor-pointer rounded-md bg-white p-1 ring-1 ring-inset ring-black/60 data-[checked]:bg-white"
        >
          <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
        </Checkbox>
      </div>
    </div>
  );
};
