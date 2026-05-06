import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Float } from '@react-three/drei';
import { DNA_STRUCTURE, getBaseColors } from '@/src/constants';

interface HelixSegmentProps {
  id: number;
  type: 'AT' | 'TA' | 'CG' | 'GC';
  y: number;
  rotation: number;
  onHover: (id: number | null) => void;
  isHovered: boolean;
}

const HelixSegment: React.FC<HelixSegmentProps> = ({ id, type, y, rotation, onHover, isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);
  const colors = useMemo(() => getBaseColors(type), [type]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation + state.clock.getElapsedTime() * 0.5;
    }
  });

  const radius = DNA_STRUCTURE.RADIUS;

  return (
    <group ref={groupRef} position={[0, y - (DNA_STRUCTURE.TOTAL_PAIRS * DNA_STRUCTURE.BASE_PAIR_HEIGHT) / 2, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Left Strand Sphere */}
        <Sphere 
          args={[0.2, 16, 16]} 
          position={[-radius, 0, 0]}
          onPointerOver={() => onHover(id)}
          onPointerOut={() => onHover(null)}
        >
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#00f2ff" 
            emissiveIntensity={isHovered ? 2 : 0.8} 
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Right Strand Sphere */}
        <Sphere 
          args={[0.2, 16, 16]} 
          position={[radius, 0, 0]}
          onPointerOver={() => onHover(id)}
          onPointerOut={() => onHover(null)}
        >
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#00f2ff" 
            emissiveIntensity={isHovered ? 2 : 0.8} 
          />
        </Sphere>
      </Float>

      {/* Connection Rods (Base Pairs) */}
      <group onPointerOver={() => onHover(id)} onPointerOut={() => onHover(null)}>
        {/* Left Base */}
        <Cylinder 
          args={[0.06, 0.06, radius, 8]} 
          rotation={[0, 0, Math.PI / 2]} 
          position={[-radius / 2, 0, 0]}
        >
          <meshStandardMaterial 
            color={colors[0]} 
            emissive={colors[0]} 
            emissiveIntensity={isHovered ? 2 : 0.6} 
          />
        </Cylinder>

        {/* Right Base */}
        <Cylinder 
          args={[0.06, 0.06, radius, 8]} 
          rotation={[0, 0, Math.PI / 2]} 
          position={[radius / 2, 0, 0]}
        >
          <meshStandardMaterial 
            color={colors[1]} 
            emissive={colors[1]} 
            emissiveIntensity={isHovered ? 2 : 0.6} 
          />
        </Cylinder>
      </group>
    </group>
  );
};

export default HelixSegment;
