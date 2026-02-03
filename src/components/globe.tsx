import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type MovingPointsProps = {
  pointCount?: number;
  radius?: number;
  effect?: GlobeEffect;
  scrollProgress?: number;
  scrollY?: number;
};

type Particle = {
  position: THREE.Vector3;
  target: THREE.Vector3;
  expandedTarget: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number; // For organic movement
};

type GlobeEffect = "sphere" | "sphere-expand";

type GlobeProps = {
  effect?: GlobeEffect;
  scrollProgress?: number;
  scrollY?: number;
};

const getAdaptivePointCount = () => {
  if (typeof window === "undefined") return 20000;

  const cores = navigator.hardwareConcurrency || 2;
  const mem = (navigator as any).deviceMemory || 4;

  const lowPower =
    cores <= 4 ||
    mem <= 4 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return lowPower ? 20000 : 50000;
};

const MovingPoints: React.FC<MovingPointsProps> = ({
  pointCount = getAdaptivePointCount(),
  radius = 3,
  effect = "sphere",
  scrollY = 0,
}) => {
  const innerRadius = radius * 0.4;
  const expandedRadius = 4.5 * 0.4;
  
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<Float32Array>(new Float32Array(pointCount * 3));

  const currentSize = useRef(0.02);
  const targetSize = useRef(0.02);

  const particles = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < pointCount; i++) {
      const t = (i + 0.5) / pointCount;
      const y = 1 - (t * 2);
      const r = Math.sqrt(1 - y * y);
      const phi = goldenAngle * i;
      
      // Normal sphere targets
      const x = Math.cos(phi) * r * innerRadius;
      const z = Math.sin(phi) * r * innerRadius;
      const target = new THREE.Vector3(x, y * innerRadius, z);
      
      // Expanded sphere targets
      const xExpanded = Math.cos(phi) * r * expandedRadius;
      const zExpanded = Math.sin(phi) * r * expandedRadius;
      const expandedTarget = new THREE.Vector3(xExpanded, y * expandedRadius, zExpanded);

      // Start with slight randomness
      const randomOffset = 0.15;
      const position = new THREE.Vector3(
        x + (Math.random() - 0.5) * randomOffset,
        y * innerRadius + (Math.random() - 0.5) * randomOffset,
        z + (Math.random() - 0.5) * randomOffset
      );

      // Small random velocity for organic movement
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      );

      // Random phase for wave-like motion
      const phase = Math.random() * Math.PI * 2;

      arr.push({ 
        position, 
        target,
        expandedTarget,
        velocity,
        phase
      });
    }
    
    return arr;
  }, [pointCount, innerRadius, expandedRadius]);

  useFrame((state, delta) => {
    const positions = positionsRef.current;
    const time = state.clock.getElapsedTime();

    // Screen dimensions
    const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 768;
    const isMinHeight = typeof window !== 'undefined' && window.innerHeight >= 700;
    
    // Horizontal Position
    const targetX = (isLargeScreen && effect === "sphere") ? 2 : 0;
    
    const baseY = isLargeScreen ? -0.3 : -1.5;
    const maxScrollForMovement = 400;
    const scrollRatio = Math.min(scrollY / maxScrollForMovement, 1);
    // Vertical Position
    const targetY = (isLargeScreen && isMinHeight && effect === "sphere") 
      ? 0.3 
      : !isLargeScreen && effect === "sphere" 
        ? -0.5 
        : (baseY + (scrollRatio * Math.abs(baseY)));

    // Dynamic max expansion radius based on effect
    const maxExpansionRadius = effect === "sphere-expand" ? 4.5 : 2.5;

    let avgDistance = 0;
    for (let i = 0; i < Math.min(particles.length, 100); i++) {
      avgDistance += particles[i].position.length();
    }
    avgDistance /= Math.min(particles.length, 100);

    if (avgDistance < 4) {
      targetSize.current = 0.02;
    } else {
      const expansionRatio = Math.min((avgDistance - 5) / (maxExpansionRadius - 5), 1);
      targetSize.current = 0.02 + (expansionRatio * 0.03);
    }
    
    currentSize.current += (targetSize.current - currentSize.current) * 0.1;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Choose target based on effect
      const activeTarget = effect === "sphere-expand" ? p.expandedTarget : p.target;
      
      // Add subtle organic movement with sine waves
      const waveOffset = new THREE.Vector3(
        Math.sin(time * 0.5 + p.phase) * 0.015,
        Math.cos(time * 0.3 + p.phase) * 0.015,
        Math.sin(time * 0.4 + p.phase + 1) * 0.015
      );
      
      // Apply small velocity drift
      p.position.add(p.velocity);
      
      // Add wave offset to target
      const offsetTarget = activeTarget.clone().add(waveOffset);
      
      // Strong lerp to keep sphere shape, but not perfect
      p.position.lerp(offsetTarget, 0.15);
      
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = 0.3;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }

    if (pointsRef.current && pointsRef.current.material) {
      (pointsRef.current.material as THREE.PointsMaterial).size = currentSize.current;
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={positionsRef.current} stride={3}>
        <PointMaterial
          transparent
          color={effect === 'sphere-expand' ? '#555' : '#fff'}
          size={currentSize.current}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Globe: React.FC<GlobeProps> = ({ effect = "sphere", scrollProgress = 0, scrollY = 0 }) => {
  return (
    <div className="h-[100%] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <MovingPoints effect={effect} scrollProgress={scrollProgress} scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default Globe;