import { clearHistory } from "@lib/actions";
import { showToast } from "@lib/utils";

export default function ClearHistory() {
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-sm font-semibold">
        Eliminar todas las transacciones.
        <p className="text-xs font-normal text-palette-200">
          Se eliminaran todas las transacciones de esta cuenta.
        </p>
      </h2>
      <form
        className="transition rounded-md h-10 w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-red-500 font-medium text-md hover:bg-red-500 hover:text-palette-100 sm:justify-center lg:justify-start"
        action={async () => {
          "use server";
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
          Clear History
        </button>
      </form>
    </div>
  );
}
