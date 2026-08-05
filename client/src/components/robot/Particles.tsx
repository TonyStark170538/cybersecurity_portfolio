import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";

export default function Particles() {
  const positions = useMemo(() => {
    const arr = new Float32Array(700 * 3);

    for (let i = 0; i < 700; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = Math.random() * 6 - 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    return arr;
  }, []);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#D6A544"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}