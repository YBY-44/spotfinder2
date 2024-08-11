import { ReactNode, useState } from "react";
export interface RevealProps {
  secret: ReactNode;
  showInstruction?: boolean;
  className?: string;
}

export const Reveal = ({
  secret,
  showInstruction = true,
  className,
}: RevealProps) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <button
      className={"flex flex-col items-center gap-2 " + className}
      onClick={() =>
        setRevealed((state) => {
          return !state;
        })
      }
    >
      <span
        className={`text-lg tracking-wider w-full border rounded-md px-1 ${
          revealed
            ? "bg-white shadow-sm "
            : "bg-[length:100px_10px] bg-[linear-gradient(to_right,#000000_0px,transparent_100px),linear-gradient(to_bottom,#ffffff_5px,transparent_5px)] text-transparent"
        }`}
      >
        {secret}
      </span>
      {showInstruction ? (
        <span className="text-xs text-gray-600">
          {revealed ? "Hide" : "Tap to reveal"}
        </span>
      ) : null}
    </button>
  );
};
