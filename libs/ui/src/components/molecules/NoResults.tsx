import { IconBox } from "@tabler/icons-react";
export const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-60 bg-gray-25">
      <IconBox className="h-10 w-10" />
      <div className="text-sm">No results</div>
    </div>
  );
};
