import * as THREE from 'three'
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { useTransition} from 'react-spring'
import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, draco } from 'drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import planet3D from "./lowpoly_earth.glb"


function Planet({ url }) {
  const { nodes, materials } = useLoader(GLTFLoader, url, draco())
  console.log("nodes", nodes)
  console.log("materials", materials)
    
const earthColor = "#389e3c";
const waterColor = "#3282b8";

const [active, setActive] = useState(0);
    const activeRef = useRef(active);
    activeRef.current = active;

    useEffect(() => {
        let timeout
        const toggleActive = () => {
          timeout = setTimeout(() => {
            setActive(Number(!activeRef.current))
            toggleActive()
          }, Math.random() * 3000 + 1000)
        }
        toggleActive()
        return () => {
          clearTimeout(timeout)
        }
      }, [])

const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 20, precision: 0.001 }
})
const scale = spring.to([0, 1], [1, 1.1])

  return (
      <group rotation={[0, 0, 0]} position={[0, 0, 0]} scale={[2, 2, 2]}>
        <mesh castShadow receiveShadow geometry={nodes.low_poly_earth_0.geometry} material={materials.water} >
            <meshPhongMaterial castShadow receiveShadow attach="material" side={THREE.DoubleSide} color={waterColor} transparent roughness={0.1} metalness={0.1} />
        </mesh>
        <a.mesh scale-x={scale} scale-y={scale} scale-z={scale} castShadow receiveShadow geometry={nodes.low_poly_earth_1.geometry} material={materials.earth} >
            <meshPhongMaterial castShadow receiveShadow attach="material" side={THREE.DoubleSide} color={earthColor} transparent roughness={0.1} metalness={0.1} />
        </a.mesh>
    </group>
  )
}


export default function App() {
  return (
      <Canvas style={{height: 300, marginTop: 60}}>
        <fog attach="fog" args={['#ffffff', 16, 20]} />
        <ambientLight />
        <directionalLight 
            position={[0, 10, 0]}
            intensity={1.2}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={25}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            />
        <pointLight position={[-10, 0, -20]} intensity={0.8} />
        <Suspense fallback={null}>
          <Planet url={planet3D} />
        </Suspense>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
  )
}