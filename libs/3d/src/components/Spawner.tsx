import * as THREE from "three";
import { ReactNode, useRef, useState } from "react";
import { WORLD_DURATION } from "../util/constants";
import { SpawnedElement } from "../util/types";
import { useFrame } from "@react-three/fiber";
interface SpawnerProps {
  startPosition: THREE.Vector3;
  endPosition: THREE.Vector3;
  duration: number;
  spawnInterval: number;
  children: ReactNode;
}

export const Spawner = ({
  startPosition,
  endPosition,
  duration = WORLD_DURATION,
  spawnInterval,
  children,
}: SpawnerProps) => {
  const [elements, setElements] = useState<Array<SpawnedElement>>([]);
  const lastSpawnTime = useRef<number>(Date.now());
  useFrame((_, delta) => {
    if (Date.now() - lastSpawnTime.current > spawnInterval * 1000) {
      const id = Date.now();
      lastSpawnTime.current = id;
      setElements((PreElements) => [...PreElements, { id, progress: 0 }]);
    }
    setElements((PreElements) => {
      return PreElements.map((element) => {
        return {
          ...element,
          progress: element.progress + delta / duration,
        };
      }).filter((element) => {
        return element.progress < 1;
      });
    });
  });
  return (
    <>
      {elements.map((element) => {
        const position = new THREE.Vector3().lerpVectors(
          startPosition,
          endPosition,
          element.progress,
        );
        return (
          <group key={element.id} position={position}>
            {children}
          </group>
        );
      })}
    </>
  );
};
