import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const position: [number, number, number] = [2, 0, 0]

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      const x = Math.sin(state.clock.elapsedTime * 0.4) * 2
      const y = Math.cos(state.clock.elapsedTime * 0.6) * 1.5
      meshRef.current.position.set(x, y, 0)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#06b6d4" 
        metalness={0.7} 
        roughness={0.3}
        emissive="#06b6d4"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const position: [number, number, number] = [-3, 1, 0]

  useFrame((state) => {
    if (meshRef.current) {
      const x = Math.cos(state.clock.elapsedTime * 0.3) * 3
      const y = Math.sin(state.clock.elapsedTime * 0.4) * 2
      const z = Math.sin(state.clock.elapsedTime * 0.2) * 1
      meshRef.current.position.set(x, y, z)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial 
        color="#f59e0b" 
        metalness={0.6} 
        roughness={0.4}
        emissive="#f59e0b"
        emissiveIntensity={0.15}
      />
    </mesh>
  )
}

function StarField() {
  const stars = useMemo(() => {
    const temp = []
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes.position"
          count={stars.length / 3}
          array={stars}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.1} />
    </points>
  )
}

export default function ThreeDBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="#06b6d4"
        />
        
        <StarField />
        <FloatingCube />
        <FloatingSphere />
      </Canvas>
    </div>
  )
}
