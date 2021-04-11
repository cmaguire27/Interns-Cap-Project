import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {OrbitControls,  useGLTF  } from '@react-three/drei';
import {useSpring,a} from 'react-spring/three';
import strapSound from "./velcro-noise.mp3";
import './App.css';

const openStrap = new Audio(strapSound);

function Cap(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('../../../Cap.glb')

  const handleClick = () => {
    console.log("Working");
  }
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
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} material={nodes.Sphere.material} scale={[1.98, 1.98, 1.98]} />
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[0, 0.09, 2.21]}
        scale={[2.01, -0.06, 1.88]}
        onClick={handleClick}
      />
      <mesh
        geometry={nodes.Sphere001.geometry}
        material={nodes.Sphere001.material}
        position={[0.02, 1.73, 0.01]}
        scale={[0.3, 0.3, 0.3]}
      />
      <mesh
        geometry={nodes.Sphere002.geometry}
        material={nodes.Sphere002.material}
        rotation={[0, -0.27, 0]}
        scale={[1.98, 1.98, 1.98]}
      />
      <mesh
        geometry={nodes.Sphere003.geometry}
        material={nodes.Sphere003.material}
        rotation={[0, -0.07, 0]}
        scale={[1.98, 1.98, 1.98]}
      />
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
      /></a.group>
    </group>
  )
}

function App() {
  const[open,setOpen] = useState(false);
  return (
    
    
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
      
      <Cap open={open} setOpen={setOpen} />
      </Suspense>
      
    </Canvas>
  );
}

export default App;
