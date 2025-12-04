'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('../components/Scene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #87ceeb 0%, #e0f6ff 100%)',
      color: '#333',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      Loading Animation...
    </div>
  )
})

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Scene />
      </Suspense>
    </main>
  )
}
