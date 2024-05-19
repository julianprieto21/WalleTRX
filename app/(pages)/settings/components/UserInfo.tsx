import { dict } from "@lib/dictionaries";
import { User } from "next-auth";

export default function UserInfo({ user }: { user: User | undefined }) {
  const { userInfo: text } = dict.settings.options;
  if (!user) return <div></div>;
  return (
    <>
      <img
        src={user.image ?? ""}
        alt="usuario"
        className="size-12 rounded-full"
      />
      <div className="flex w-full justify-between">
        <h2 className="text-md font-semibold">
          {text.name}:
          <p className="text-sm font-normal text-palette-200">{user.name}</p>
        </h2>
        <button
          title="Logout"
          type="submit"
          className="transition rounded-md h-10 w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-palette-200 font-medium text-md hover:bg-palette-500 hover:text-palette-300 justify-center items-center"
        >
          <p className="block sm:hidden lg:block">{text.editName}</p>
        </button>
      </div>
      <div className="flex w-full justify-between">
        <h2 className="text-md font-semibold">
          {text.email}:
          <p className="text-sm font-normal text-palette-200">{user.email}</p>
        </h2>
        <button
          title="Logout"
          type="submit"
          className="transition rounded-md h-10 w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-palette-200 font-medium text-md hover:bg-palette-500 hover:text-palette-300 justify-center items-center"
        >
          <p className="block sm:hidden lg:block">{text.editEmail}</p>
        </button>
      </div>
    </>
  );
}
