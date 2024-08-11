import { TAKE_COUNT } from "../constant";
import { useState } from "react";
export const useTakeStep = (initialSkip = 0, initialTake = TAKE_COUNT) => {
  const [skip, setSkip] = useState(() => initialSkip);
  const [take, setTake] = useState(() => initialTake);
  return { skip, setSkip, take, setTake };
};
