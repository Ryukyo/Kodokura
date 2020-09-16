import React, { useState, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import * as THREE from 'three';
import FBXLoader from 'three-fbx-loader'
import { Scene } from 'three';



export const Avatar = ({ position }) => {
    // let loader = new FBXLoader();

    // let scene = new THREE.Scene();

    
    // let camera;
    // let renderer;


    // // camera = new THREE.PerspectiveCamera(35, 50, 0.1, 500);
    // // camera.position.set(-50, 40, 350);

    // renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    // renderer.setSize();
    // renderer.setPixelRatio(window.devicePixelRatio);


    // loader.load('../Pokemon_XY/Lilligant/Lilligant.FBX', function(object3d) {
    //     scene.add(object3d);
    //     renderer.render(scene, camera);
    // })


    const [active, setActive] = useState(0);
    const activeRef = useRef(active);
    activeRef.current = active;

    useEffect(() => {
        let timeout
        const toggleActive = () => {
          timeout = setTimeout(() => {
            setActive(Number(!activeRef.current))
            toggleActive()
          }, Math.random() * 2000 + 1000)
        }
        toggleActive()
        return () => {
          clearTimeout(timeout)
        }
      }, [])

    const { spring } = useSpring({
        spring: active,
        config: { mass: 3, tension: 100, friction: 20, precision: 0.001 }
    })

    const scale = spring.to([0, 1], [1, 2])
    const rotation = spring.to([0, 1], [0, Math.PI])
    const color = spring.to([0, 1], ["#999999", "#ffffff"])

    return (
        <a.mesh
        rotation-y={rotation}
        scale-x={scale}
        scale-y={scale}
        scale-z={scale}
        position={position}
        >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <a.meshStandardMaterial roughness={0.5} attach="material" color={color}/>
        </a.mesh>
    )
}
