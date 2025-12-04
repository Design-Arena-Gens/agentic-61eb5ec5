import { forwardRef } from 'react'
import * as THREE from 'three'

const Jax = forwardRef<THREE.Group>((props, ref) => {
  return (
    <group ref={ref} {...props}>
      {/* Main body - red jeep */}
      <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[0.6, 0.25, 0.4]} />
        <meshStandardMaterial
          color="#d32f2f"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Hood */}
      <mesh castShadow receiveShadow position={[0.25, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.15, 0.35]} />
        <meshStandardMaterial
          color="#c62828"
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Cabin */}
      <mesh castShadow receiveShadow position={[-0.1, 0.32, 0]}>
        <boxGeometry args={[0.3, 0.18, 0.35]} />
        <meshStandardMaterial
          color="#b71c1c"
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Windshield */}
      <mesh castShadow receiveShadow position={[0.05, 0.32, 0]}>
        <boxGeometry args={[0.05, 0.15, 0.33]} />
        <meshStandardMaterial
          color="#333333"
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Front wheels */}
      <group position={[0.22, 0.08, 0.22]} name="wheel">
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      <group position={[0.22, 0.08, -0.22]} name="wheel">
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* Back wheels */}
      <group position={[-0.22, 0.08, 0.22]} name="wheel">
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-0.22, 0.08, -0.22]} name="wheel">
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* Eyes (animated headlights) - confident expression */}
      <group position={[0.35, 0.12, 0.12]}>
        <mesh castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffff00" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.01, 0, 0.01]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
      <group position={[0.35, 0.12, -0.12]}>
        <mesh castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffff00" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.01, 0, -0.01]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Bumper with mud */}
      <mesh castShadow receiveShadow position={[0.38, 0.08, 0]}>
        <boxGeometry args={[0.08, 0.04, 0.42]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* Grille */}
      <mesh position={[0.35, 0.12, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  )
})

Jax.displayName = 'Jax'

export default Jax
