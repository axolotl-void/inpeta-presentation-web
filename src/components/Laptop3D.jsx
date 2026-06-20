import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import screenshotUrl from '../assets/inpeta-screenshot.png';

/*
 * Laptop3D — Procedural laptop built from box geometries
 * Driven by scrollProgress (0..1):
 *   0.44-0.55  → Laptop rises from below (TEKNOLOGI)
 *   0.55-0.66  → Laptop rotates to face viewer, screen shows texture (GIS DEMO)
 *   0.66-0.77  → Laptop shrinks out (FITUR)
 *   0.77+      → Hidden
 */
export default function Laptop3D({ scrollProgress = 0 }) {
  const groupRef = useRef();
  const screenRef = useRef();
  const lidRef = useRef();

  // Load the inPETA screenshot as texture using Vite-resolved URL
  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(screenshotUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const p = scrollProgress;
    const group = groupRef.current;

    if (p >= 0.40 && p < 0.77) {
      // --- VISIBLE RANGE ---
      
      if (p < 0.50) {
        // Rise from below
        const riseProgress = (p - 0.40) / 0.10;
        const yPos = THREE.MathUtils.lerp(-8, 0, Math.min(riseProgress, 1));
        group.position.lerp(new THREE.Vector3(2.5, yPos, -1), 0.06);
        group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.06);
      } else if (p < 0.66) {
        // Fully visible, gentle float
        const floatY = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
        group.position.lerp(new THREE.Vector3(2.5, floatY, -1), 0.05);
        group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      } else {
        // Shrink out
        const exitProgress = (p - 0.66) / 0.11;
        group.position.lerp(new THREE.Vector3(4, 3, -4), 0.06);
        const s = THREE.MathUtils.lerp(1, 0.01, Math.min(exitProgress, 1));
        group.scale.lerp(new THREE.Vector3(s, s, s), 0.06);
      }

      // Gentle rotation
      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        Math.sin(state.clock.elapsedTime * 0.5) * 0.15 - 0.3,
        0.03
      );
      
      // Lid opening animation
      if (lidRef.current) {
        const openAngle = p < 0.48 
          ? THREE.MathUtils.lerp(0, -Math.PI * 0.42, (p - 0.40) / 0.08)
          : -Math.PI * 0.42;
        lidRef.current.rotation.x = THREE.MathUtils.lerp(
          lidRef.current.rotation.x,
          openAngle,
          0.05
        );
      }
    } else {
      // Hidden
      group.position.lerp(new THREE.Vector3(4, -10, -6), 0.08);
      group.scale.lerp(new THREE.Vector3(0.01, 0.01, 0.01), 0.08);
      if (lidRef.current) {
        lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, 0, 0.05);
      }
    }
  });

  const metalGray = '#2a2a2e';
  const darkGray = '#1a1a1e';

  return (
    <group ref={groupRef} position={[4, -10, -6]} rotation={[0.15, -0.3, 0]}>
      {/* === BASE / KEYBOARD === */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.12, 2.2]} />
        <meshStandardMaterial color={metalGray} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Keyboard keys area (darker inset) */}
      <mesh position={[0, 0.065, -0.1]}>
        <boxGeometry args={[2.8, 0.01, 1.4]} />
        <meshStandardMaterial color={darkGray} metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.065, 0.7]}>
        <boxGeometry args={[1.2, 0.01, 0.5]} />
        <meshStandardMaterial color="#222226" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* === LID / SCREEN (pivot at back edge) === */}
      <group ref={lidRef} position={[0, 0.06, -1.1]}>
        {/* Lid back panel */}
        <mesh position={[0, 1.1, 0.02]}>
          <boxGeometry args={[3.2, 2.1, 0.08]} />
          <meshStandardMaterial color={metalGray} metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Screen bezel (dark frame) */}
        <mesh position={[0, 1.1, 0.07]}>
          <boxGeometry args={[3.0, 1.9, 0.01]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>

        {/* Screen display (with inPETA texture) */}
        <mesh ref={screenRef} position={[0, 1.1, 0.08]}>
          <planeGeometry args={[2.7, 1.7]} />
          <meshStandardMaterial
            map={texture}
            emissive="#ffffff"
            emissiveIntensity={0.15}
            emissiveMap={texture}
          />
        </mesh>

        {/* Screen glow light */}
        <pointLight
          position={[0, 1.1, 0.5]}
          color="#3b82f6"
          intensity={0.5}
          distance={3}
        />
      </group>

      {/* Status LED */}
      <mesh position={[0, 0.07, 1.08]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}
