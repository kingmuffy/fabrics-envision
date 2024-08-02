/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const FabricPreview = ({ maps }) => {
  // const meshRef = useRef();
  const [textures, setTextures] = useState({});
  const model = useLoader(FBXLoader, "https://fabrics-envision.vercel.app/src/assets/FabricTexture.fbx");

  useEffect(() => {
    const loadTextures = async () => {
      const loadedTextures = {};
      for (const mapKey of Object.keys(maps)) {
        if (maps[mapKey].file) {
          const url = URL.createObjectURL(maps[mapKey].file);
          const texture = await new Promise((resolve, reject) => {
            const loader = new TextureLoader();
            loader.load(url, resolve, undefined, reject);
          });
          texture.wrapS = texture.wrapT =
            maps[mapKey].tiling === "repeat"
              ? THREE.RepeatWrapping
              : maps[mapKey].tiling === "mirror"
              ? THREE.MirroredRepeatWrapping
              : THREE.ClampToEdgeWrapping;
          texture.repeat.set(maps[mapKey].scale, maps[mapKey].scale);
          texture.needsUpdate = true;
          loadedTextures[mapKey] = texture;
        }
      }
      setTextures(loadedTextures);
    };
    loadTextures();
  }, [maps]);

  useEffect(() => {
    if (model && textures) {
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.map = textures.diffuse || null;
          child.material.normalMap = textures.normal || null;
          child.material.roughnessMap = textures.glossiness || null;
          child.material.metalnessMap = textures.metalness || null;
          child.material.aoMap = textures.ao || null;
          child.material.displacementMap = textures.height || null;
          child.material.emissiveMap = textures.emissive || null;
          child.material.alphaMap = textures.opacity || null;

          // Apply intensity as a multiplier to the color
          if (textures.diffuse) {
            child.material.color.setScalar(maps.diffuse.intensity);
          }

          child.material.needsUpdate = true;
        }
      });
    }
  }, [model, textures]);

  useEffect(() => {
    if (textures) {
      Object.keys(textures).forEach((key) => {
        const texture = textures[key];
        if (texture) {
          texture.wrapS = texture.wrapT =
            maps[key].tiling === "repeat"
              ? THREE.RepeatWrapping
              : maps[key].tiling === "mirror"
              ? THREE.MirroredRepeatWrapping
              : THREE.ClampToEdgeWrapping;
          texture.repeat.set(maps[key].scale, maps[key].scale);
          texture.needsUpdate = true;
        }
      });
    }
  }, [textures, maps]);

  // R3f hooks can be used only in the canvas component
  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += 0.01; // Rotate for visual confirmation
  //   }
  // });
  const MyMesh = () => {
    const meshRef = useRef();

    useFrame(() => {
      if (meshRef.current) {
        // rotating the object
        meshRef.current.rotation.y += 0.5;
      }
    });
    return <mesh ref={meshRef} />;
  };

  return (
    <Canvas
      style={{ height: "100%", width: "100%" }}
      camera={{ position: [10, 0, 5], near: 0.1, far: 1000, fov: 50 }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[0, 10, 10]} intensity={1.5} />
      <MyMesh />
      {model && <primitive object={model} />}
      <OrbitControls
        enableZoom={true}
        zoomSpeed={0.3}
        minDistance={5}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset="city" />
    </Canvas>
  );
};

export default FabricPreview;
//rvt me
