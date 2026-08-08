import {
  Float,
  useAnimations,
  useGLTF,
} from "@react-three/drei";

import {
  useFrame,
} from "@react-three/fiber";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import * as THREE from "three";


type Props = {
  onActivate?: () => void;
};


export default function RobotModel({
  onActivate
}: Props) {


  const group =
    useRef<THREE.Group>(null);


  const { scene, animations } =
    useGLTF("/models/robot.glb");


  const { actions } =
    useAnimations(
      animations,
      group
    );


  const [active, setActive] =
    useState(false);

  const [hasIntroduced, setHasIntroduced] =
    useState(false);
  const audioRef =
  useRef<HTMLAudioElement | null>(null);


  const mouse =
    useRef({
      x: 0,
      y: 0
    });


  const glowing =
    useRef<THREE.Mesh[]>([]);


  useEffect(() => {


    Object.values(actions)
      .forEach(
        (action) => action?.play()
      );


    const meshes: THREE.Mesh[] = [];


    scene.traverse((obj) => {


      if (
        obj instanceof THREE.Mesh &&
        obj.material instanceof THREE.MeshStandardMaterial
      ) {

        meshes.push(obj);

      }

    });


    glowing.current =
      meshes;


    const moveMouse =
      (e: MouseEvent) => {


        mouse.current.x =
          (e.clientX / window.innerWidth) - 0.5;


        mouse.current.y =
          (e.clientY / window.innerHeight) - 0.5;

      };


    const moveTouch =
      (e: TouchEvent) => {


        const touch =
          e.touches[0];


        mouse.current.x =
          (touch.clientX / window.innerWidth) - 0.5;


        mouse.current.y =
          (touch.clientY / window.innerHeight) - 0.5;

      };


    window.addEventListener(
      "mousemove",
      moveMouse
    );


    window.addEventListener(
      "touchmove",
      moveTouch,
      {
        passive: true
      }
    );


    return () => {


      window.removeEventListener(
        "mousemove",
        moveMouse
      );


      window.removeEventListener(
        "touchmove",
        moveTouch
      );

    };


  }, [actions, scene]);


  useFrame((state, delta) => {


    const robot =
      group.current;


    if (!robot)
      return;


    // look at user

    robot.rotation.y =
      THREE.MathUtils.lerp(
        robot.rotation.y,
        mouse.current.x * 0.5,
        delta * 3
      );


    robot.rotation.x =
      THREE.MathUtils.lerp(
        robot.rotation.x,
        mouse.current.y * -0.25,
        delta * 3
      );


    // small alive movement

    robot.position.y =
      Math.sin(
        state.clock.elapsedTime * 2
      ) * 0.08;


    // glow

    glowing.current.forEach((mesh) => {


      const material =
        mesh.material as THREE.MeshStandardMaterial;


      material.emissive.set(
        active
          ? "#00ffff"
          : "#ff0033"
      );


      material.emissiveIntensity =
        THREE.MathUtils.lerp(
          material.emissiveIntensity,
          active ? 5 : 1,
          delta * 5
        );

    });


  });


  function activate() {

  setActive(true);

  onActivate?.();

  // Stop previous voice
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  // First click = intro
  // Later clicks = joke
  const audio = new Audio(
    hasIntroduced
      ? "/models/jokes.mp3"
      : "/models/intro.mp3"
  );

  audioRef.current = audio;

  audio.play().catch((error) => {

    console.error(
      "Unable to play robot voice:",
      error
    );

  });

  setHasIntroduced(true);

  audio.onended = () => {
    setActive(false);
  };

}


  return (

    <Float
      speed={1}
      floatIntensity={0.08}
      rotationIntensity={0.03}
    >

      <group
  ref={group}
  onClick={activate}
>

        <primitive
          object={scene}
          scale={0.52}
          position={[0, -1.35, 0]}
        />

      </group>

    </Float>

  );


}


useGLTF.preload(
  "/models/robot.glb"
);