import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Laptop3D from './Laptop3D';

/*
 * Scene3D — Full-screen fixed Canvas behind all HTML content.
 * Renders the 3D Laptop. The mounting is managed by App.jsx to prevent WebGL context conflicts.
 */
export default function Scene3D({ scrollProgress = 0 }) {
  return (
    <div 
      className="canvas-container" 
      id="canvas-container"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.8} 
            color="#a8c4e6"
          />
          <pointLight 
            position={[-5, -3, 5]} 
            intensity={0.4} 
            color="#3b82f6"
          />
          <pointLight 
            position={[3, 4, -5]} 
            intensity={0.3} 
            color="#10b981"
          />

          {/* Background Stars */}
          <Stars
            radius={80}
            depth={60}
            count={3000}
            factor={4}
            saturation={0.2}
            fade
            speed={0.5}
          />

          {/* 3D Objects */}
          <Laptop3D scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
