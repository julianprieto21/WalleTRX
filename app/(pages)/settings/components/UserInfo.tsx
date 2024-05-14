import { User } from "next-auth";

export default function UserInfo({ user }: { user: User | undefined }) {
  if (!user) return <div></div>;
  return (
    <div className="flex flex-col items-start gap-2 w-2/5 p-3 border rounded-md border-palette-200">
      <img
        src={user.image ?? ""}
        alt="usuario"
        className="size-12 rounded-full"
      />
      <div className="flex w-full justify-between">
        <h2 className="text-md font-semibold">
          Nombre:
          <p className="text-sm font-normal text-palette-200">{user.name}</p>
        </h2>
        <button
          title="Logout"
          type="submit"
          className="transition rounded-md h-10 w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-palette-200 font-medium text-md hover:bg-palette-500 hover:text-palette-300 justify-center items-center"
        >
          <p className="block sm:hidden lg:block">Editar nombre</p>
        </button>
      </div>
      <div className="flex w-full justify-between">
        <h2 className="text-md font-semibold">
          Email:
          <p className="text-sm font-normal text-palette-200">{user.email}</p>
        </h2>
        <button
          title="Logout"
          type="submit"
          className="transition rounded-md h-10 w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-palette-200 font-medium text-md hover:bg-palette-500 hover:text-palette-300 justify-center items-center"
        >
          <p className="block sm:hidden lg:block">Editar email</p>
        </button>
      </div>
    </div>
  );
}
