import { useEffect, useState } from "react";
import { SquareProps } from "./Square";
import { MathUtils } from "three";
import { BUILDING_SETS } from "../util/building";
import { randExp } from "../util";
import { Building } from "../components/Buildings";
export const BuildingSets = ({
  minHeight = 5,
  maxHeight = 20,
}: {
  minHeight?: number;
  maxHeight?: number;
}) => {
  const [buildingSets, setBuildingSets] = useState<number>(0);
  const [floors, setFloors] = useState<number[]>([]);
  useEffect(() => {
    setBuildingSets(MathUtils.randInt(0, BUILDING_SETS.length - 1));
    setFloors(
      BUILDING_SETS[buildingSets].map(() => {
        const randHeight = randExp(minHeight, maxHeight, 7);
        return Math.floor(randHeight);
      }),
    );
  }, []);
  return (
    <group>
      {BUILDING_SETS[buildingSets].map(({ length, position, width }, i) => {
        return (
          <Building
            key={i}
            position={
              position.map((pos) => {
                return pos * 2;
              }) as [number, number, number]
            }
            size={[width * 2, length * 2]}
            floors={floors[i]}
          />
        );
      })}
    </group>
  );
};
