import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import RobotModel from "./RobotModel";

type Props = {
  onActivate?: () => void;
};


export default function Robot({
  onActivate
}:Props){


return (

<Canvas

camera={{
position:[0,1,5],
fov:45
}}

>


<ambientLight
intensity={1.7}
/>


<directionalLight

position={[5,6,5]}

intensity={3}

/>


<pointLight

color="#8b1a8b"

position={[0,2,2]}

intensity={1}

/>


<Environment preset="city"/>


<RobotModel
onActivate={onActivate}
/>


</Canvas>


);

}