import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {OrbitControls,  useGLTF  } from '@react-three/drei';
import {useSpring,a} from 'react-spring/three';
import strapSound from "./velcro-noise.mp3";
import './App.css';
import {proxy, snapshot, useSnapshot, useProxy} from "valtio";
import { MeshStandardMaterial } from 'three';

const openStrap = new Audio(strapSound);

const state = proxy( {
  current: null,
  items: {
    Sphere: "#ffffff",
    Cube:"#ffffff",
    Sphere001:"#ffffff",
    Sphere002:"#ffffff",
    Sphere003:"#ffffff",
    Sphere004:"#ffffff",
  }
});

function Cap(props) {
  const group = useRef();
  const snap = proxy(state);
  const { nodes, materials } = useGLTF('../../../Cap.glb');
  const [hovered, set] = useState(null);
  const [active, setActive] = useState(false);
  

  

  const handleOpen=()=>{
    props.setOpen(!props.open);
    openStrap.volume = 0.3;
    openStrap.play();
}

const openStrapAnimation = useSpring({
    rotation: props.open ? [0.02,-0.2,-0.02]:[0,0,0],
    position: props.open ? [0,0,0]:[0,0,0]
});

  return (
    <group ref={group} {...props} dispose={null}  >

      <mesh 
        geometry={nodes.Sphere.geometry}
       material={nodes.Sphere.material}
        scale={[1.98, 1.98, 1.98]}
      >
        <meshStandardMaterial color={snap.items.Sphere} />
      </mesh>

      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[0, 0.09, 2.21]}
        scale={[2.01, -0.06, 1.88]}
      >
        <meshStandardMaterial color={snap.items.Cube}/>
      </mesh>

      <mesh
        geometry={nodes.Sphere001.geometry}
        material={nodes.Sphere001.material}
        position={[0.02, 1.73, 0.01]}
        scale={[0.3, 0.3, 0.3]}
        >
          <meshStandardMaterial color={snap.items.Sphere001} />
     </mesh>

      <mesh
        geometry={nodes.Sphere002.geometry}
        material={nodes.Sphere002.material}
        rotation={[0, -0.27, 0]}
        scale={[1.98, 1.98, 1.98]}
        >
          <meshStandardMaterial color={snap.items.Sphere002} />
        </mesh>

      <mesh
        geometry={nodes.Sphere003.geometry}
        material={nodes.Sphere003.material}
        rotation={[0, -0.07, 0]}
        scale={[1.98, 1.98, 1.98]}
        >
          <meshStandardMaterial color={snap.items.Sphere003} />
        </mesh>
        
      


      <a.group rotation={openStrapAnimation.rotation}>
        <primitive object = {nodes.Sphere004} />
        <a.primitive
          rotation={openStrapAnimation.rotation}
          object={nodes.Sphere004}
        />
        
      <mesh
        onClick={handleOpen}
        geometry={nodes.Sphere004.geometry}
        material={nodes.Sphere004.material}
        position={[0.12, -0.01, -0.04]}
        scale={[1.98, 1.98, 1.98]}
      >
        <meshStandardMaterial color={snap.items.Sphere004} />
      </mesh>
      </a.group>
      
    </group>
  )
}



function PresetButton(){
  const snap = proxy(state);
  const handleClickOne = () => {
      snap.current = "Classic cap";
      snap.items.Sphere = "#FFFFFF";
      snap.items.Cube = "#ff0000";
      snap.items.Sphere001 = "#ff0000";
      snap.items.Sphere002 ="#000000";
      snap.items.Sphere003 = "#000000";
      snap.items.Sphere004 = "#d4af37";
      
    }
    const handleClickTwo = () => {
      snap.current = "Colorful cap";
      snap.items.Sphere = "#0000FF";
      snap.items.Cube = "#00FF00";
      snap.items.Sphere001 = "#6600FF";
      snap.items.Sphere002 ="#FF6600";
      snap.items.Sphere003 = "#FFFF00";
      snap.items.Sphere004 = "#d4af37";
    }
    const handleClickThree = () =>{
      snap.current = "Hard Hat";
      snap.items.Sphere = "#FFFF00";
      snap.items.Cube = "#FFFF00";
      snap.items.Sphere001 = "#FFFF00";
      snap.items.Sphere002 ="#FFFF00";
      snap.items.Sphere003 = "#FFFF00";
      snap.items.Sphere004 = "#FFFF00";
    }
   
  
  return(
    <>
    <button onClick={handleClickOne}>
      Classic Cap
    </button>
    <button onClick={handleClickTwo}>
      Colourful Cap
    </button>
    <button onClick={handleClickThree}>
      Hard Hat
    </button>
    <h1>{snap.current}</h1>
    </>
  );
}

function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="#ffffff" />
    </mesh>
  );
}
function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="#ffffff" />
    </mesh>
  );
}


function App() {
  const[open,setOpen] = useState(false);
  return (
    
   <>
   <PresetButton />
    <Canvas 
    colorManagement
    shadowMap
    camera={{position: [-5,5,5], fov: 40}}
    invalidateFrameloop 
    style={{ background: "#fff" }}>
    <OrbitControls
    enableDamping={true}
    dampingFactor={0.25}
    rotateSpeed={0.4}
    keyPanSpeed={0.4}
    screenSpacePanning={true}
    zoomSpeed={0.6}
    enablePan={true}
    panSpeed={0.4}
    minDistance={-500}
    maxDistance={1000}
  />
  

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
      <GroundPlane />
      <BackDrop />
      <Cap open={open} setOpen={setOpen} />
      </Suspense>
      
    </Canvas>
    </>
  );
}

export default App;
