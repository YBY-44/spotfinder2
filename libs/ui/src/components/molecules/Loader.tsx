import { IconRotateClockwise2 } from "@tabler/icons-react";
import { AlertSection } from "./AlertSection";
export const LoaderIcon = () => {
  return <IconRotateClockwise2 className="animate-spin" />;
};
export const LoadingPage = ({ text }: { text: string }) => {
  return (
    <AlertSection title={text}>
      <LoaderIcon />
    </AlertSection>
  );
};
