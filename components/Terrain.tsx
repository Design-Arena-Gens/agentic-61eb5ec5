import * as THREE from 'three'
import { useMemo } from 'react'

export default function Terrain() {
  // Generate random grass blades
  const grassPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < 300; i++) {
      positions.push({
        x: Math.random() * 40 - 20,
        z: Math.random() * 20 - 10,
        rotation: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 0.5
      })
    }
    return positions
  }, [])

  // Generate rocks
  const rocks = useMemo(() => {
    const rockData = []
    for (let i = 0; i < 40; i++) {
      rockData.push({
        x: Math.random() * 40 - 20,
        z: Math.random() * 20 - 10,
        size: 0.05 + Math.random() * 0.15,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
      })
    }
    return rockData
  }, [])

  return (
    <group>
      {/* Ground plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 25]} />
        <meshStandardMaterial
          color="#7CB342"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Dirt path */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[50, 1.5]} />
        <meshStandardMaterial
          color="#8D6E63"
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      {/* Path edges with slight dirt */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0.8]}>
        <planeGeometry args={[50, 0.3]} />
        <meshStandardMaterial
          color="#6D4C41"
          roughness={1}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -0.8]}>
        <planeGeometry args={[50, 0.3]} />
        <meshStandardMaterial
          color="#6D4C41"
          roughness={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Grass blades */}
      {grassPositions.map((pos, i) => (
        <mesh
          key={`grass-${i}`}
          castShadow
          position={[pos.x, 0.05, pos.z]}
          rotation={[0, pos.rotation, 0]}
          scale={[pos.scale, pos.scale, pos.scale]}
        >
          <coneGeometry args={[0.02, 0.1, 3]} />
          <meshStandardMaterial
            color="#558B2F"
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* Rocks */}
      {rocks.map((rock, i) => (
        <mesh
          key={`rock-${i}`}
          castShadow
          receiveShadow
          position={[rock.x, rock.size / 2, rock.z]}
          rotation={rock.rotation as [number, number, number]}
        >
          <dodecahedronGeometry args={[rock.size, 0]} />
          <meshStandardMaterial
            color="#616161"
            roughness={0.95}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Trees on the sides */}
      {[-8, -6, 6, 8].map((zPos, i) => (
        <group key={`tree-${i}`} position={[i < 2 ? -8 : 8, 0, zPos]}>
          {/* Trunk */}
          <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
            <meshStandardMaterial color="#5D4037" roughness={0.9} />
          </mesh>
          {/* Leaves */}
          <mesh castShadow position={[0, 1, 0]}>
            <coneGeometry args={[0.6, 1.2, 8]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.8} />
          </mesh>
          <mesh castShadow position={[0, 1.5, 0]}>
            <coneGeometry args={[0.5, 1, 8]} />
            <meshStandardMaterial color="#388E3C" roughness={0.8} />
          </mesh>
          <mesh castShadow position={[0, 1.9, 0]}>
            <coneGeometry args={[0.35, 0.7, 8]} />
            <meshStandardMaterial color="#43A047" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Dust particles (simplified) */}
      <group position={[0, 0.05, 0]}>
        {[...Array(20)].map((_, i) => (
          <mesh
            key={`dust-${i}`}
            position={[-5 + i * 0.3, 0.02 + Math.random() * 0.05, -0.2 + Math.random() * 0.4]}
          >
            <sphereGeometry args={[0.01, 4, 4]} />
            <meshStandardMaterial
              color="#D7CCC8"
              transparent
              opacity={0.4}
              roughness={1}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
