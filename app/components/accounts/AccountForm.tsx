// "use client";
import { createAccount, editTransaction } from "@/app/lib/actions";
import { Account } from "@/app/lib/types";
// import { Selector, TypeInput } from "@/components";
import { CURRENCIES } from "@/app/lib/const/currencies";
import { CloseButton, SubmitButton } from "../buttons";
import _ from "lodash";
import { Selector } from "../transactions/FormInputs";

interface Props {
  account?: Account;
  dict: any;
}

export default function AccountForm({ account, dict }: Props) {
  const action = account
    ? editTransaction.bind(null, account.id)
    : createAccount;
  return (
    <form
      action={action}
      className="w-full bg-palette-300 rounded-lg shadow-md"
    >
      <main className="flex flex-col gap-6 px-2 py-4 md:gap-4 md:px-4 lg:gap-6">
        <section className="flex w-full items-center gap-4">
          <input
            title="Name"
            name="name"
            type="text"
            placeholder={dict.input.name}
            className="grow text-left h-12 rounded-md pl-2 border border-palette-250 bg-palette-400 text-palette-100 placeholder:text-palette-250"
          ></input>
          <input
            title="Color"
            name="color"
            type="color"
            className="w-32 h-10 rounded-lg"
          ></input>
        </section>
        <section className="flex gap-4">
          <Selector
            list={CURRENCIES}
            inputId="currency"
            text={dict.input.selector.currency}
          />
          <Selector
            list={[
              { id: "standard", name: "Estándar" },
              // { id: "crypto", name: "Crypto" },
            ]}
            inputId="type"
            text={dict.input.selector.type}
          />
        </section>

        <footer className="flex flex-row justify-between sm:justify-end gap-4 px-2">
          <CloseButton text={dict.buttons.cancel} />
          <SubmitButton text={dict.buttons.confirm} />
        </footer>
      </main>
    </form>
  );
}
