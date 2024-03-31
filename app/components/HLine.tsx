interface Props {
  width: number;
  color: string;
  text?: string;
}

export default function HLine({ width, color, text }: Props) {
  if (!text) {
    return <hr className={`border-t border-palette-250 w-[${width}%]`}></hr>;
  } else {
    return (
      <div className="flex flex-row items-center w-[100%]">
        <hr className={`border-t border-palette-250 w-3/5 ml-3`}></hr>
        <p className="text-sm font-thin w-[100%] text-center">{text}</p>
        <hr className={`border-t border-palette-250 w-3/5 mr-3`}></hr>
      </div>
    );
  }
}
