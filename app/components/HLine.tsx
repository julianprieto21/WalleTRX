interface Props {
  width: number;
  color: string;
  text?: string;
  margin: number;
}

export default function HLine({ width, color, text, margin }: Props) {
  if (!text) {
    return (
      <hr
        className={`border-t border-${color}-400 w-[${width}%] my-${margin}`}
      ></hr>
    );
  } else {
    return (
      <div className="flex flex-row items-center w-[100%] my-2">
        <hr
          className={`border-t border-${color}-400 w-3/5 my-${margin} ml-3`}
        ></hr>
        <p className="text-sm font-thin w-[100%] text-center">{text}</p>
        <hr
          className={`border-t border-${color}-400 w-3/5 my-${margin} mr-3`}
        ></hr>
      </div>
    );
  }
}
