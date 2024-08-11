import { Square, SquareProps } from "./Square";
import { FLOOR_HEIGHT } from "../util/constants";
interface BuildingProps extends SquareProps {
  floors?: number;
}
export const Building = ({ position, size, floors = 3 }: BuildingProps) => {
  return (
    <>
      {Array.from({ length: floors }, (_, index: number) => {
        return (
          <Square
            key={index}
            position={[
              position[0],
              position[1] + index * FLOOR_HEIGHT,
              position[2],
            ]}
            size={size}
            borderColor="white"
          />
        );
      })}
    </>
  );
};
