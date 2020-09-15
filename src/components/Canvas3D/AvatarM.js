import * as THREE from 'three'
import React, { Suspense, useState, useEffect } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import { useTransition, a } from 'react-spring'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, draco } from 'drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { AvatarFiles } from "./AvatarFiles.js"
import turtle3D from "./TurtleShellMeshPBR.glb"
import turtleTexture from "./PBRTurtleShellComplete.png"
import slime3D from "./SlimeMeshPBR.glb"
import slimeTexture from "./PBRSlimeComplete.png"



function Model() {
  const { nodes, materials } = useLoader(GLTFLoader, turtle3D, draco())
  const texture = useLoader(TextureLoader, turtleTexture);
  texture.flipY = false;
  
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={[6, 6, 6]}>
        <mesh castShadow receiveShadow geometry={nodes.TurtleShell.geometry} material={materials.lambert1} >
          <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    </group>
  )
}

function Loading() {
  const [finished, set] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => set(true)
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200)
  }, [])

  const props = useTransition(finished, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  })

  return props.map(
    ({ item: finished, key, props: { opacity, width } }) =>
      !finished && (
        <a.div className="loading" key={key} style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width }} />
          </div>
        </a.div>
      ),
  )
}

export default function AvatarM() {
  return (
    <>
      <div className="bg" />
     
      <Canvas shadowMap camera={{ position: [0, 0, 10], fov: 80 }}>
        <ambientLight intensity={10}/>
        <pointLight intensity={10} position={[-10, 10, -10]} />
        <spotLight
          castShadow
          intensity={10}
          angle={0.2}
          penumbra={1}
          position={[25, 25, 25]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        {/* <fog attach="fog" args={['#cc7b32', 16, 20]} /> */}
        <Suspense fallback={null}>
          {/* <Model url={turtle} objText={texturecolor} nodesGeo={TurtleShell.geometry} matMat={MaterialTurtle} /> */}
          <Model />
        </Suspense>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <div className="layer" />
      <Loading />
    </>
  )
}