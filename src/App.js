import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import GenericCubeEBody from './Components/CubeEBody'
import FemaleConnector from './Components/Female'
import MaleConnector from './Components/MaleConnector'
import './App.css';


function App() {
  return (
    
    
    <Canvas 
    colorManagement
    shadowMap
    camera={{position: [-1,1,1], fov: 40}}
    invalidateFrameloop 
    style={{ background: "#fff" }}>
   

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
      <FemaleConnector  position={[0,0,0.165]} rotation={[90*(Math.PI/180),0,0]}/> 
      </Suspense>
      
  
    </Canvas>
  );
}

export default App;
