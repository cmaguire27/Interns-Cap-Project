import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import GenericCubeEBody from './Components/CubeEBody'
import FemaleConnector from './Components/Female'
import MaleConnector from './Components/MaleConnector'
import {OrbitControls} from '@react-three/drei'
import './App.css';

function Cube1(props){
  
  return(
    //frontright
    //back left
    //bottom
    //front left
    //back right
    <group
    name="cubex">
    <GenericCubeEBody/>
    
    <FemaleConnector  position={[0,0,0.165]} rotation={[90*(Math.PI/180),0,0]}/> 
    <FemaleConnector  position={[0,0,-0.165]} rotation={[270*(Math.PI/180),0,0]}/>
    <FemaleConnector  position={[0,-0.165,0]} rotation={[180*(Math.PI/180),0,0]}/>
    <FemaleConnector   position={[-0.165,0,0]} rotation={[90*(Math.PI/180),0,90*(Math.PI/180)]}/>
    <FemaleConnector   position={[0.165,0,0]} rotation={[90*(Math.PI/180),0,270*(Math.PI/180)]}/>
    <MaleConnector  position={[0,0.16,0]} rotation={[0*(Math.PI/180),0,0]} />
    
      </group>
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
      <Cube1 />
      </Suspense>
    </Canvas>
  );
}

export default App;
