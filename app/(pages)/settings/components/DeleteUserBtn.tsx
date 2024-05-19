"use client";
import { deleteUser } from "@lib/actions";
import { dict } from "@lib/dictionaries";
import { showToast } from "@lib/utils";

export default function DeleteUser() {
  const { deleteUser: text } = dict.settings.options;
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-sm font-semibold">
        {text.title}
        <p className="text-xs font-normal text-palette-200">
          {text.description}
        </p>
      </h2>
      <form
        className="transition rounded-md h-10 w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-red-500 font-medium text-md hover:bg-red-500 hover:text-palette-100 sm:justify-center lg:justify-start"
        action={async () => {
          try {
            await deleteUser();
            showToast("User deleted!", "success");
          } catch (err) {
            showToast("Error deleting user", "error");
            console.error(err);
          }
        }}
      >
        <button
          title="Delete user"
          type="submit"
          className="size-full text-center"
        >
          {text.button}
        </button>
      </form>
    </div>
  );
}
