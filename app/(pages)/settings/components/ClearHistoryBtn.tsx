"use client";
import { clearHistory } from "@lib/actions";
import { dict } from "@lib/dictionaries";
import { showToast } from "@lib/utils";

export default function ClearHistory() {
  const { clearHistory: text } = dict.settings.options;
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-sm font-semibold">
        {text.title}
        <p className="text-xs font-normal text-palette-200">
          {text.description}
        </p>
      </h2>
      <form
        className="transition rounded-md w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-red-500 font-medium text-md hover:bg-red-500 hover:text-palette-100 sm:justify-center lg:justify-start 2xl:h-10"
        action={async () => {
          try {
            await clearHistory();
            showToast("History cleared", "success");
          } catch (err) {
            showToast("Error clearing history", "error");
            console.error(err);
          }
        }}
      >
        <button
          title="Clear history"
          type="submit"
          className="size-full text-center"
        >
          {text.button}
        </button>
      </form>
    </div>
  );
}
