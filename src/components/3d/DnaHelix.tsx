import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import HelixSegment from './HelixSegment';
import Particles from './Particles';
import { DNA_STRUCTURE } from '@/src/constants';

interface DnaHelixProps {
  onHoverSegment: (id: number | null) => void;
  hoveredId: number | null;
}

const DnaHelix: React.FC<DnaHelixProps> = ({ onHoverSegment, hoveredId }) => {
  const segments = useMemo(() => {
    const types: ('AT' | 'TA' | 'CG' | 'GC')[] = ['AT', 'TA', 'CG', 'GC'];
    return Array.from({ length: DNA_STRUCTURE.TOTAL_PAIRS }).map((_, i) => ({
      id: i,
      type: types[i % 4],
      y: i * DNA_STRUCTURE.BASE_PAIR_HEIGHT,
      rotation: i * DNA_STRUCTURE.ROTATION_STEP,
    }));
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 cursor-crosshair">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={5} 
          maxDistance={25}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#bc13fe" />

        <group rotation={[0, 0, Math.PI / 8]}>
          {segments.map((segment) => (
            <HelixSegment 
              key={segment.id} 
              {...segment} 
              onHover={onHoverSegment}
              isHovered={hoveredId === segment.id}
            />
          ))}
        </group>

        <Particles />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default DnaHelix;
