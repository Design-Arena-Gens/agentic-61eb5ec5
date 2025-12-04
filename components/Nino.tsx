import { forwardRef } from 'react'
import * as THREE from 'three'

const Nino = forwardRef<THREE.Group>((props, ref) => {
  return (
    <group ref={ref} {...props}>
      {/* Body - blue robot */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.2, 0.12]} />
        <meshStandardMaterial
          color="#2196F3"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Head */}
      <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[0.12, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#1976D2"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Antenna */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
        <meshStandardMaterial color="#1565C0" metalness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.26, 0]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Eyes - nervous expression (wide eyes) */}
      <mesh castShadow position={[0.04, 0.16, 0.03]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00ffff"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.05, 0.16, 0.035]}>
        <sphereGeometry args={[0.008, 12, 12]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh castShadow position={[0.04, 0.16, -0.03]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00ffff"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.05, 0.16, -0.035]}>
        <sphereGeometry args={[0.008, 12, 12]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Arms - small hands */}
      <group position={[0, 0, 0.08]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
          <meshStandardMaterial color="#1976D2" metalness={0.8} />
        </mesh>
        <mesh castShadow position={[0, -0.08, 0]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color="#0D47A1" metalness={0.6} />
        </mesh>
      </group>
      <group position={[0, 0, -0.08]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
          <meshStandardMaterial color="#1976D2" metalness={0.8} />
        </mesh>
        <mesh castShadow position={[0, -0.08, 0]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color="#0D47A1" metalness={0.6} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh castShadow receiveShadow position={[0, -0.15, 0.04]}>
        <cylinderGeometry args={[0.02, 0.025, 0.1, 8]} />
        <meshStandardMaterial color="#1565C0" metalness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.15, -0.04]}>
        <cylinderGeometry args={[0.02, 0.025, 0.1, 8]} />
        <meshStandardMaterial color="#1565C0" metalness={0.7} />
      </mesh>

      {/* Tool bag - heavy looking */}
      <group position={[-0.05, -0.05, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.12, 0.08]} />
          <meshStandardMaterial
            color="#8B4513"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        {/* Bag handle */}
        <mesh castShadow position={[0, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.04, 0.008, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>
        {/* Tools sticking out */}
        <mesh castShadow position={[0.03, 0.08, 0.02]}>
          <cylinderGeometry args={[0.005, 0.005, 0.08, 6]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} />
        </mesh>
        <mesh castShadow position={[-0.02, 0.09, -0.02]}>
          <cylinderGeometry args={[0.006, 0.006, 0.06, 6]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} />
        </mesh>
      </group>
    </group>
  )
})

Nino.displayName = 'Nino'

export default Nino
