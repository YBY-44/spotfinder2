import { DotPlugs } from "../atoms/Dot";
export const FilterHeading = ({
  title,
  dirty = true,
}: {
  title: string;
  dirty: boolean;
}) => {
  return (
    <div className="relative inline-block font-semibold">
      {dirty && <DotPlugs />}
      {title}
    </div>
  );
};
