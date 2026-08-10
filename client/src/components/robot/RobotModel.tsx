import {
  Float,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  onActivate?: () => void;
  state?: RobotVisualState;
  frozen?: boolean;
  idleAnimation?: boolean;
};

export type RobotVisualState =
  | "ready"
  | "thinking"
  | "speaking";

export default function RobotModel({
  onActivate,
  state = "ready",
  frozen = false,
  idleAnimation = true,
}: Props) {
  const group = useRef<THREE.Group | null>(null);

  const { scene, animations } = useGLTF("/models/robot.glb");

  const { actions } = useAnimations(
    animations,
    group,
  );

  const [active, setActive] = useState(false);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const glowing = useRef<THREE.Object3D[]>([]);

  /*
   * Find the robot meshes once the GLB is loaded.
   *
   * We intentionally don't use instanceof THREE.Mesh or
   * instanceof THREE.MeshStandardMaterial here because newer
   * Three.js typings can cause excessive type-depth errors.
   */
  useEffect(() => {
    const meshes: THREE.Object3D[] = [];

    scene.traverse((object) => {
      if ("isMesh" in object && object.isMesh) {
        meshes.push(object);
      }
    });

    glowing.current = meshes;
  }, [scene]);

  /*
   * The GLB ships with an authored "Scene" action. Play it while the robot
   * is waiting for interaction so idle mode has real character animation.
   */
  useEffect(() => {
    const [firstAction] = Object.values(actions);
    const idleAction = actions.Scene ?? firstAction;

    if (!idleAction) {
      return;
    }

    if (idleAnimation) {
      idleAction.reset().fadeIn(0.35).play();
    } else {
      idleAction.fadeOut(0.2);
    }
  }, [actions, idleAnimation]);

  /*
   * Mouse tracking
   */
  useEffect(() => {
    const moveMouse = (event: MouseEvent) => {
      mouse.current.x =
        event.clientX / window.innerWidth - 0.5;

      mouse.current.y =
        event.clientY / window.innerHeight - 0.5;
    };

    const moveTouch = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      mouse.current.x =
        touch.clientX / window.innerWidth - 0.5;

      mouse.current.y =
        touch.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener(
      "mousemove",
      moveMouse,
    );

    window.addEventListener(
      "touchmove",
      moveTouch,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveMouse,
      );

      window.removeEventListener(
        "touchmove",
        moveTouch,
      );
    };
  }, []);

  /*
   * Robot animation / interaction.
   */
  useFrame((frameState, delta) => {
    const robot = group.current;

    if (!robot) {
      return;
    }

    const isThinking = state === "thinking";
    const isSpeaking = state === "speaking";
    // A frozen state is available for future modal transitions, but normal
    // activation remains animated: J.A.R.V.I.S. should look awake, not posed.
    const isStill = frozen && !isThinking && !isSpeaking;
    const isReady = !isThinking && !isSpeaking && !isStill;
    const elapsed = frameState.clock.elapsedTime;

    /*
     * Follow the cursor, with a slow autonomous idle sway so the robot
     * continues to feel alive even when nobody is moving the mouse.
     */
    if (!isStill) {
      robot.rotation.y = THREE.MathUtils.lerp(
        robot.rotation.y,
        mouse.current.x * 0.5 +
          (isReady ? Math.sin(elapsed * 0.65) * 0.1 : 0),
        delta * 3,
      );

      robot.rotation.x = THREE.MathUtils.lerp(
        robot.rotation.x,
        mouse.current.y * -0.25 +
          (isReady ? Math.sin(elapsed * 0.9) * 0.025 : 0),
        delta * 3,
      );

      robot.rotation.z = THREE.MathUtils.lerp(
        robot.rotation.z,
        isReady ? Math.sin(elapsed * 0.75) * 0.035 : 0,
        delta * 2,
      );
    }

    const pulse =
      Math.sin(elapsed * (isSpeaking ? 7 : 3)) *
      (isSpeaking ? 0.5 : isThinking ? 0.2 : 0);

    if (!isStill) {
      robot.position.y =
        Math.sin(elapsed * (isReady ? 1.35 : 2)) *
        (isSpeaking ? 0.12 : isReady ? 0.13 : 0.08);
    }

    /*
     * Robot glow.
     */
    glowing.current.forEach((object) => {
      const material = (
        object as THREE.Mesh
      ).material;

      if (
        material &&
        typeof material === "object" &&
        "emissive" in material &&
        "emissiveIntensity" in material
      ) {
        const emissiveMaterial =
          material as THREE.MeshStandardMaterial;

        emissiveMaterial.emissive.set(
          isSpeaking
            ? "#00ffff"
            : isThinking
              ? "#D6A544"
              : active
                ? "#00ffff"
                : "#ff0033",
        );

        emissiveMaterial.emissiveIntensity =
          THREE.MathUtils.lerp(
            emissiveMaterial.emissiveIntensity,
            isSpeaking
              ? 5 + pulse
              : isThinking
                ? 3 + pulse
                : active
                  ? 4
                  : 1,
            delta * 5,
          );
      }
    });
  });

  /*
   * Robot interaction.
   *
   * IMPORTANT:
   * Audio is no longer played here.
   *
   * RobotAssistant owns the AI audio lifecycle.
   * This component only changes the robot's visual state
   * and notifies the parent.
   */
  function activate() {
    setActive(true);

    onActivate?.();

    /*
     * Keep the visual activation brief for a normal click.
     * If RobotAssistant controls speaking state separately,
     * it can be connected to this state later.
     */
    window.setTimeout(() => {
      setActive(false);
    }, 1200);
  }

  return (
    <Float
      speed={frozen ? 0 : 1}
      floatIntensity={frozen ? 0 : 0.08}
      rotationIntensity={frozen ? 0 : 0.03}
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
  "/models/robot.glb",
);
