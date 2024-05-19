"use client";
import { clearHistory, deleteUser } from "@lib/actions";
import { showToast } from "@lib/utils";

export default function DeleteUser() {
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-sm font-semibold">
        Eliminar usuario
        <p className="text-xs font-normal text-palette-200">
          Se eliminará TODO. Esta accion es irreversible.
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
          Delete User
        </button>
      </form>
    </div>
  );
}
