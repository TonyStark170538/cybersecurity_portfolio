import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function RobotModel() {
  const group = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF("/models/robot.glb");

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.play());
  }, [actions]);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={group}>
        <primitive
          object={scene}
          scale={0.4}
          position={[0, -0.8, 0]}
        />
      </group>
    </Float>
  );
}

export default function Robot() {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <Environment preset="city" />

      <RobotModel />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/robot.glb");