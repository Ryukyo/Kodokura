import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import { a } from "@react-spring/three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from "drei";
import planet3D from "./lowpoly_earth.glb";

function Planet({ url }) {
  const { nodes, materials } = useLoader(GLTFLoader, url, draco());
  const earthColor = "#228B22";
  const waterColor = "#3282b8";
  const mesh = useRef();


  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <group position={[0, 0, 0]} scale={[2.8, 2.8, 2.8]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.low_poly_earth_0.geometry}
        material={materials.water}
      >
        <meshPhongMaterial
          castShadow
          receiveShadow
          attach="material"
          side={THREE.DoubleSide}
          color={waterColor}
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      <a.mesh
        ref={mesh}
        castShadow
        receiveShadow
        geometry={nodes.low_poly_earth_1.geometry}
        material={materials.earth}
      >
        <meshPhongMaterial
          castShadow
          receiveShadow
          attach="material"
          side={THREE.DoubleSide}
          color={earthColor}
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </a.mesh>
    </group>
  );
}

export default function App() {
  return (
    <Canvas colorManagement style={{ height: 300, marginTop: 60 }}>
      <fog attach="fog" args={["#ffffff", 16, 20]} />
      <ambientLight />
      <directionalLight
        position={[0, 10, 0]}
        intensity={1.2}
        penumbra={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={5}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={3}
        shadow-camera-bottom={-2}
      />
      <pointLight position={[-10, 0, -20]} intensity={0.8} />
      <Suspense fallback={null}>
        <Planet url={planet3D} />
      </Suspense>
    </Canvas>
  );
}

