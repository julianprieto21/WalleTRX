export default function MainTitle({
  userName,
  userImageUrl,
  dict,
}: {
  userName: string;
  userImageUrl: string;
  dict: any;
}) {
  return (
    <div className="w-full sm:w-1/2 sm:pl-0">
      <div className="flex flex-row justify-end sm:justify-center items-center text-left gap-12">
        <img
          src={userImageUrl}
          alt="Imagen de perfil del usuario"
          className="block rounded-full size-20 xl:size-32 2xl:size-40"
        ></img>
        <h1 className="hidden sm:block text-neutral-800 xl:text-7xl 2xl:text-8xl font-normal m-0 p-0">
          <p className="xl:text-6xl 2xl:text-7xl text-neutral-800 font-thin">
            {dict.mainTitle},
          </p>
          {userName.split(" ")[0]}
        </h1>
      </div>
    </div>
  );
}
