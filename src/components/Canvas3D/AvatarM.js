import * as THREE from "three";
import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import { useTransition } from "react-spring";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, draco } from "drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { AvatarFiles } from "./AvatarFiles.js";

// const avatar = "Bear";
function Model({ avatar }) {
  console.log("avatarName", avatar);
  const model = AvatarFiles[avatar];
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    model.object3D,
    draco()
  );
  const texture = useLoader(TextureLoader, model.texture);
  texture.flipY = false;
  console.log("animations", animations);
  return (
    <group rotation={[0, 0, 0]} position={[0, -6, 0]} scale={[7, 7, 7]}>
      <ambientLight />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes[avatar].geometry}
        material={materials[model.materials]}
      >
        <meshPhongMaterial
          attach="material"
          side={THREE.DoubleSide}
          map={texture}
        />
      </mesh>
    </group>
  );
}

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

      <Canvas shadowMap camera={{ position: [0, 0, 12], fov: 80 }}>

        <ambientLight intensity={0.1} color={"lightblue"}/>
        <pointLight intensity={0.8} position={[-10, 10, -10]} />
        {/* <spotLight
          castShadow
          intensity={1}
          angle={0.2}
          penumbra={1}
          position={[25, 25, 25]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        /> */}
        {/* <fog attach="fog" args={['#cc7b32', 16, 20]} /> */}
        <Suspense fallback={null}>
          {/* <Model url={turtle} objText={texturecolor} nodesGeo={TurtleShell.geometry} matMat={MaterialTurtle} /> */}
          {avatar ? <Model avatar={avatar} /> : <div />}
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
      <div className="layer" />
      <Loading />
    </>
  );
}
