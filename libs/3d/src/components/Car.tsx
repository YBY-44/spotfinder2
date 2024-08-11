import { Color } from "@react-three/fiber";
import { Euler, MathUtils, Vector3 } from "three";
import { useState, useEffect } from "react";
import { getRamdomComment } from "@spotfinder2/3d/src/components/Comments";
import { BlinkingParkingSlot } from "./BlinkingParkingSlot";
import { radians } from "../util";
import { Box } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { GradientPlan } from "./GradientPlan";
import { yellowColor } from "../util/constants";
interface CarProps {
  color?: Color;
  position?: Vector3;
  size?: [number, number, number];
  forward?: boolean;
  searching?: boolean;
  comment?: boolean;
  trail?: boolean;
}

export const Car: React.FC<CarProps> = ({
  color = yellowColor,
  position = new Vector3(0, 0, 0),
  forward = true,
  trail = true,
  searching = false,
  comment = false,
  size,
}: CarProps) => {
  const [vehiclesize, setVehiclesize] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [randomComment, setRandomComment] = useState<string>(() => {
    return getRamdomComment();
  });

  useEffect(() => {
    const newSize = size || [
      MathUtils.randFloat(1.9, 2.3),
      0.1,
      MathUtils.randFloat(4, 5.6),
    ];
    setVehiclesize(newSize);
  }, [size]);
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomComment(getRamdomComment());
    }, 16000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <Box
        position={position}
        rotation={[radians(0), radians(90), 0]}
        args={vehiclesize}
      >
        <meshBasicMaterial color={color} />
      </Box>
      {searching ? <BlinkingParkingSlot position={[0, 2, 0]} /> : null}
      {comment ? (
        <Html
          position={[0, 10, 0]}
          center
          style={{ maxWidth: "30rem", width: "100%" }}
          transform={false}
        >
          <div
            style={{
              color: "#aaa",
              fontSize: "0.75rem",
              outline: 1,
              outlineColor: "black",
              maxWidth: "30rem",
              width: "100%",
              whiteSpace: "pre",
              userSelect: "none",
            }}
          >
            {randomComment}
          </div>
        </Html>
      ) : null}
      {trail ? (
        forward ? (
          <GradientPlan
            position={new Vector3(vehiclesize[2] / 1.3, -0.02, position.z)}
            size={[3, 2]}
          />
        ) : (
          <GradientPlan
            rotation={new Euler(radians(-90), radians(0), radians(180))}
            position={new Vector3(-vehiclesize[2] / 1.3, -0.02, position.z)}
            size={[3, vehiclesize[0]]}
          />
        )
      ) : null}
    </>
  );
};
