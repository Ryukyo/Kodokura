import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Cubes } from './Cubes';
import { OrbitControls, draco } from 'drei';


export default function Canvas3D() {
    return (
      <Canvas camera={{ position: [10, 20, 10], fov: 60 }}>
        <ambientLight />
        <pointLight position={[-10, 10, -10]} castShadow />
        {[-6, -3, 0, 3, 6].map((x) =>
          [-6, -3, 0, 3, 6].map((z) => <Cubes position={[x, 0, z]} />)
        )}
        {/* <OrbitControls autoRotate rotateSpeed={1} /> */}
     </Canvas>
    )
}
