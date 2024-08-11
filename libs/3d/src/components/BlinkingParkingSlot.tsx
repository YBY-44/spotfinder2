import { yellowColor } from "../util/constants";
import { SquareProps } from "./Square";
import { useState, useEffect } from "react";
import { Square } from "./Square";
interface BlinkingParkingSlotProps extends SquareProps {
  blinkDuration?: number;
}
export const BlinkingParkingSlot = ({
  borderColor = yellowColor,
  blinkDuration = 1000,
  ...props
}: BlinkingParkingSlotProps) => {
  const [isBlinking, setIsBlinking] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, blinkDuration);
    return () => {
      clearInterval(interval);
    };
  }, [blinkDuration]);
  if (isBlinking) {
    return null;
  }
  return <Square {...props} borderColor={borderColor} />;
};
