interface Props {
  text?: string;
}

export default function HLine({ text }: Props) {
  if (!text) {
    return <hr className={`border-t border-palette-250 w-full`}></hr>;
  } else {
    return (
      <div className="flex flex-row items-center w-full">
        <hr className={`border-t border-palette-250 w-4/5 ml-3`}></hr>
        <p className="text-sm font-thin w-full text-center text-palette-250">
          {text}
        </p>
        <hr className={`border-t border-palette-250 w-4/5 mr-3`}></hr>
      </div>
    );
  }
}
