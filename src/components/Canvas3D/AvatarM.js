
import * as THREE from 'three'
import React, { Suspense, useState, useEffect } from 'react'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { useTransition, a } from 'react-spring'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, draco } from 'drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { AvatarFiles } from "./AvatarFiles.js"

function Model({avatar}) {
  const model = AvatarFiles[avatar]
  const { nodes, materials, animations } = useLoader(GLTFLoader, model.object3D, draco())
  const texture = useLoader(TextureLoader, model.texture);
  texture.flipY = false;
  
  // const animator = new THREE.AnimationMixer(animations[0])

  // useEffect(() => animations.forEach(clip => animator.clipAction(clip).play()), [])
  
  // useFrame((state, delta) => animator.update(delta))

  return (
    <group castShadow receiveShadow rotation={[0, 0, 0]} position={[0, -2, 0]} scale={[2, 2, 2]}>
      <ambientLight />

        <mesh geometry={nodes[avatar].geometry} material={materials[model.materials]} >
          <meshBasicMaterial  attach="material" side={THREE.DoubleSide} map={texture} />
        </mesh>
    </group>
  )

}

const Plane = () => (
  <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.001, 0]} >
    <circleGeometry  attach="geometry" args={[2.4, 200]} color="#000000"  />
    <meshToonMaterial  attach="material"  opacity={0.1} transparent={true} />
  </mesh>
);

function Loading() {
  const [finished, set] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => set(true);
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200);
  }, []);

  const props = useTransition(finished, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  });

  return props.map(
    ({ item: finished, key, props: { opacity, width } }) =>
      !finished && <div key={key}></div>
  );
}

export default function AvatarM({ avatar }) {
  return (
    <>
      <div className="bg" />
      
      <Canvas shadowMap camera={{position: [0, 0, 5]}}>
        <ambientLight intensity={0.2} color="lightblue"/>
        <spotLight 
            intensity={0.2} 
            position={[0, 10, 15]}
            penumbra={1}
            shadow-mapSize-width={20}
            shadow-mapSize-height={20}
            castShadow 
            />
        <directionalLight 
            castShadow
            position={[0, 10, 0]}
            intensity={0.1}
            penumbra={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            />
        <Suspense fallback={null}>
          {avatar ? <Model avatar={avatar}/> : <div /> }
          <Plane />
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <div className="layer" />
      {/* <Loading /> */}
    </>
  );
}
