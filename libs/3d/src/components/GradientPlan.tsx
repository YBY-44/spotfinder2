import { Vector3, Euler, CanvasTexture } from "three";
import { radians } from "../util";
import { useMemo } from "react";
export const GradientPlan = ({
  position,
  rotation = new Euler(radians(-90), 0, 0),
  size,
}: {
  position: Vector3;
  rotation?: Euler;
  size: [number, number];
}) => {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context is null");
    }
    const gradient = ctx.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, "gray");
    gradient.addColorStop(0.5, "#222");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new CanvasTexture(canvas);
  }, []);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
