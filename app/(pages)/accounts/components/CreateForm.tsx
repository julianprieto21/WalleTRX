"use client";
import {
  CancelBtn,
  SubmitBtn,
} from "@(pages)/transactions/components/FormBtns";
import { SelectorInput } from "@(pages)/transactions/components/SelectorInput";
import { createAccount } from "@lib/actions";
import { dict } from "@lib/dictionaries";
import { showToast } from "@lib/utils";

export default function CreateForm() {
  const { input, toasts } = dict;
  return (
    <form
      action={async (formData) => {
        try {
          await createAccount(formData);
          showToast(toasts.success.createAccount, "success");
        } catch (err) {
          showToast(toasts.error.createAccount, "error");
          console.error(err);
        }
      }}
      className="w-full bg-palette-300 rounded-lg shadow-md"
    >
      <main className="flex flex-col gap-6 px-2 py-4 md:gap-4 md:px-4 lg:gap-6">
        <section className="flex w-full items-center gap-4">
          <input
            title="Name"
            name="name"
            type="text"
            placeholder={input.name}
            className="focus:border-palette-500 grow text-left h-12 rounded-md pl-2 border border-palette-250 bg-palette-400 text-palette-100 placeholder:text-palette-250"
          ></input>
          <input
            title="Color"
            name="color"
            type="color"
            className="focus:border-palette-500 w-32 h-10 rounded-lg"
          ></input>
        </section>
        <section className="flex gap-4">
          <SelectorInput
            id="currency"
            options={[
              { id: "ars", name: "ARS" },
              { id: "usd", name: "USD" },
            ]}
            placeHolder={input.selector.currency}
          />
          <SelectorInput
            id="type"
            options={[
              { id: "standard", name: "Estándar" },
              { id: "crypto", name: "Crypto" },
            ]}
            placeHolder={input.selector.type}
          />
        </section>

        <footer className="flex flex-row justify-between sm:justify-end gap-4 px-2">
          <CancelBtn />
          <SubmitBtn />
        </footer>
      </main>
    </form>
  );
}
