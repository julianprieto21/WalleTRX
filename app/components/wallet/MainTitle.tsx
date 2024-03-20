import { lang } from "@/app/lib/const/string-en";

export default function MainTitle({
  userName,
  userImageUrl,
}: {
  userName: string;
  userImageUrl: string;
}) {
  return (
    <div className="hidden sm:block w-1/2 pl-4 sm:pl-0">
      <div className="flex flex-row justify-center items-center text-left gap-12">
        <img
          src={userImageUrl}
          alt="Imagen de perfil del usuario"
          className="hidden xl:block rounded-full size-40"
        ></img>
        <h1 className="text-neutral-800 text-8xl font-normal m-0 p-0">
          <p className="text-7xl text-neutral-800 font-thin">{lang.hiText},</p>
          {userName.split(" ")[0]}
        </h1>
      </div>
    </div>
  );
}
