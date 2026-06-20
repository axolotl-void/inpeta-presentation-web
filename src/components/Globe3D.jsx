import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * Globe3D — Procedural neon wireframe Earth
 * Driven by scrollProgress (0..1):
 *   0.00-0.11  → Full globe visible, rotating slowly (HERO)
 *   0.11-0.22  → Zoom in toward Banda Aceh, pin glows (PROFIL)
 *   0.22-0.33  → Globe shrinks to top-right corner (MASALAH)
 *   0.33-0.44  → Globe fades out (TUJUAN)
 *   0.88-1.00  → Globe fades back in from afar (KESIMPULAN)
 */
export default function Globe3D({ scrollProgress = 0 }) {
  const globeRef = useRef();
  const glowRef = useRef();
  const pinRef = useRef();
  const groupRef = useRef();

  // Banda Aceh coordinates → spherical position on globe
  // lat=5.55, lon=95.33 → θ, φ
  const pinPosition = useMemo(() => {
    const lat = 5.55 * (Math.PI / 180);
    const lon = (95.33 - 90) * (Math.PI / 180); // offset for visual alignment
    const r = 2.05; // slightly above globe surface
    return new THREE.Vector3(
      r * Math.cos(lat) * Math.cos(lon),
      r * Math.sin(lat),
      r * Math.cos(lat) * Math.sin(lon)
    );
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const p = scrollProgress;
    const group = groupRef.current;

    // --- ROTATION ---
    // Slow auto-rotate, stops during zoom
    const rotSpeed = p < 0.11 ? 0.15 : p < 0.22 ? 0.02 : 0.05;
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * rotSpeed;
    }

    // --- POSITION & SCALE ---
    if (p < 0.11) {
      // Section 1: Center, full size
      group.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
    } else if (p < 0.22) {
      // Section 2: Zoom in (scale up, move slightly left)
      group.position.lerp(new THREE.Vector3(-1, 0, 2), 0.04);
      group.scale.lerp(new THREE.Vector3(2.5, 2.5, 2.5), 0.04);
    } else if (p < 0.33) {
      // Section 3: Shrink to top-right corner
      group.position.lerp(new THREE.Vector3(4, 3, -2), 0.05);
      group.scale.lerp(new THREE.Vector3(0.4, 0.4, 0.4), 0.05);
    } else if (p < 0.44) {
      // Section 4: Fade out (move far away)
      group.position.lerp(new THREE.Vector3(6, 5, -8), 0.05);
      group.scale.lerp(new THREE.Vector3(0.1, 0.1, 0.1), 0.05);
    } else if (p > 0.88) {
      // Section 9: Come back from afar
      const returnProgress = (p - 0.88) / 0.12;
      const targetScale = 0.6 + returnProgress * 0.4;
      group.position.lerp(new THREE.Vector3(2, 0, -1), 0.04);
      group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.04);
    } else {
      // Sections 5-8: Hidden
      group.position.lerp(new THREE.Vector3(8, 6, -12), 0.06);
      group.scale.lerp(new THREE.Vector3(0.01, 0.01, 0.01), 0.06);
    }

    // --- OPACITY ---
    if (globeRef.current) {
      const targetOpacity = (p < 0.4 || p > 0.85) ? 1 : 0;
      globeRef.current.material.opacity = THREE.MathUtils.lerp(
        globeRef.current.material.opacity,
        targetOpacity,
        0.05
      );
    }

    // --- PIN glow pulse ---
    if (pinRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
      pinRef.current.material.emissiveIntensity = pulse * 2;
      // Only show pin during zoom sections
      pinRef.current.visible = p > 0.08 && p < 0.35;
    }

    // --- GLOW ring ---
    if (glowRef.current) {
      glowRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      glowRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Globe - Wireframe sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          color="#0a4a8a"
          wireframe
          transparent
          opacity={1}
          emissive="#1e40af"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner solid sphere for depth */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshStandardMaterial
          color="#050d1a"
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Equator glow ring */}
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Second orbit ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Banda Aceh pin marker */}
      <mesh ref={pinRef} position={pinPosition}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Pin glow halo */}
      <mesh position={pinPosition}>
        <ringGeometry args={[0.1, 0.18, 32]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={1}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmospheric glow (large transparent sphere) */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
