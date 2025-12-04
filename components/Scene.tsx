'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Sky, Environment } from '@react-three/drei'
import * as THREE from 'three'
import Jax from './Jax'
import Nino from './Nino'
import Terrain from './Terrain'

function AnimationScene() {
  const jaxRef = useRef<THREE.Group>(null)
  const ninoRef = useRef<THREE.Group>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [dialogue, setDialogue] = useState<{ speaker: string; text: string; type: string } | null>(null)

  const animationDuration = 8 // 8 seconds

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.016 // ~60fps
          if (newTime >= animationDuration) {
            setIsPlaying(false)
            return animationDuration
          }
          return newTime
        })
      }, 16)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    // Dialogue timing
    if (currentTime > 1 && currentTime < 3.5) {
      setDialogue({ speaker: 'JAX', text: 'Come on, Nino! If you\'re slow, we won\'t make it!', type: 'jax' })
    } else if (currentTime >= 3.5 && currentTime < 6) {
      setDialogue({ speaker: 'NINO', text: 'Wait! This bag is too heavy!', type: 'nino' })
    } else if (currentTime >= 6 || currentTime < 1) {
      setDialogue(null)
    }
  }, [currentTime])

  useFrame(() => {
    if (!isPlaying || !jaxRef.current || !ninoRef.current || !cameraRef.current) return

    const t = currentTime / animationDuration

    // Jax movement - drives fast along path
    const jaxSpeed = 8
    const jaxX = -10 + (t * jaxSpeed * animationDuration)
    jaxRef.current.position.set(jaxX, 0.15, 0)
    jaxRef.current.rotation.y = -Math.PI / 2

    // Wheels rotation
    const wheelRotation = currentTime * 10
    jaxRef.current.children.forEach((child) => {
      if (child.name === 'wheel') {
        child.rotation.x = wheelRotation
      }
    })

    // Nino movement - struggles behind with bag
    const ninoSpeed = 5
    const ninoX = -10 + (t * ninoSpeed * animationDuration) - 2
    const wobble = Math.sin(currentTime * 8) * 0.08 // struggling animation
    ninoRef.current.position.set(ninoX, 0.1 + Math.abs(wobble), 0.3)
    ninoRef.current.rotation.z = wobble * 0.5
    ninoRef.current.rotation.y = -Math.PI / 2

    // Camera tracking - low angle from left side, focused on Jax's wheels
    const cameraOffsetX = -1.5
    const cameraOffsetY = 0.3
    const cameraOffsetZ = -1.2

    cameraRef.current.position.set(
      jaxX + cameraOffsetX,
      cameraOffsetY,
      cameraOffsetZ
    )
    cameraRef.current.lookAt(jaxX, 0.1, 0)
  })

  const handlePlayPause = () => {
    if (currentTime >= animationDuration) {
      setCurrentTime(0)
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentTime(0)
    setIsPlaying(false)
    setDialogue(null)
  }

  return (
    <>
      <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[-12, 0.3, -1.2]} fov={50} />

        {/* Lighting for Pixar-style look */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 15, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#fff5e6"
        />
        <directionalLight position={[-5, 10, -5]} intensity={0.3} color="#b8d4ff" />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.6} penumbra={1} castShadow />

        <Sky sunPosition={[100, 20, 100]} />
        <Environment preset="sunset" />
        <fog attach="fog" args={['#e0f6ff', 20, 50]} />

        {/* Scene elements */}
        <Terrain />
        <Jax ref={jaxRef} />
        <Nino ref={ninoRef} />

        {/* Controls (disabled during animation) */}
        {!isPlaying && <OrbitControls />}
      </Canvas>

      {/* UI Controls */}
      <div className="controls">
        <button onClick={handlePlayPause} className={isPlaying ? 'active' : ''}>
          {currentTime >= animationDuration ? '↻ Replay' : isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={handleReset}>⏹ Reset</button>
      </div>

      {/* Dialogue Box */}
      {dialogue && (
        <div className={`dialogue-box ${dialogue.type}`}>
          <div className="speaker">{dialogue.speaker}</div>
          <div className="text">{dialogue.text}</div>
        </div>
      )}
    </>
  )
}

export default function Scene() {
  return <AnimationScene />
}
