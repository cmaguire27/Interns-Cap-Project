import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {OrbitControls } from '@react-three/drei'
import GenericCubeEBody from './Components/CubeEBody'
import FemaleConnector from './Components/Female'
import MaleConnector from './Components/MaleConnector'
import './App.css';

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 0.4 : 0.3}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1,1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App() {
  return (
    
    
    <Canvas 
    colorManagement
    shadowMap
    camera={{position: [-1,1,1], fov: 40}}
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
      <Box position={[0, 0, 0]} />
      </Suspense>
      
  
    </Canvas>
  );
}

export default App;
