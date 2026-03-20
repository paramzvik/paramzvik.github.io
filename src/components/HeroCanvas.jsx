import { Float, Html, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function SignalArchitecture() {
  const root = useRef(null)
  const ring = useRef(null)
  const beam = useRef(null)
  const shardLeft = useRef(null)
  const shardRight = useRef(null)

  useFrame((state, delta) => {
    if (!root.current || !ring.current || !beam.current || !shardLeft.current || !shardRight.current) {
      return
    }

    const pointerX = state.pointer.x
    const pointerY = state.pointer.y

    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointerX * 0.32, 0.06)
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, pointerY * -0.12, 0.06)

    ring.current.rotation.z += delta * 0.45
    beam.current.scale.y = THREE.MathUtils.lerp(beam.current.scale.y, 1 + Math.abs(pointerY) * 0.32, 0.08)
    shardLeft.current.position.x = THREE.MathUtils.lerp(shardLeft.current.position.x, -1.15 + pointerX * 0.18, 0.08)
    shardRight.current.position.x = THREE.MathUtils.lerp(shardRight.current.position.x, 1.15 + pointerX * 0.18, 0.08)

    root.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.05
  })

  return (
    <group ref={root} position={[0, -0.3, 0]}>
      <mesh position={[0, -1.35, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[2.5, 72]} />
        <meshStandardMaterial color="#131d2c" roughness={0.92} />
      </mesh>

      <mesh ref={beam} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.8, 32]} />
        <meshStandardMaterial color="#e45b2f" emissive="#e45b2f" emissiveIntensity={0.35} />
      </mesh>

      <RoundedBox args={[1.2, 1.7, 0.42]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a2738" roughness={0.25} metalness={0.35} />
      </RoundedBox>

      <RoundedBox args={[0.92, 1.34, 0.06]} radius={0.05} smoothness={4} position={[0, 0, 0.23]} castShadow>
        <meshStandardMaterial color="#7de8d4" emissive="#7de8d4" emissiveIntensity={0.95} />
      </RoundedBox>

      <mesh ref={ring} position={[0, 0.08, 0.45]} castShadow>
        <torusGeometry args={[0.68, 0.05, 24, 100]} />
        <meshStandardMaterial color="#f7f0df" metalness={0.5} roughness={0.25} />
      </mesh>

      <Float speed={2.4} floatIntensity={0.45} rotationIntensity={0.2}>
        <RoundedBox ref={shardLeft} args={[0.34, 0.82, 0.08]} radius={0.04} smoothness={4} position={[-1.15, 0.36, -0.2]} castShadow rotation={[0.18, 0.48, -0.18]}>
          <meshStandardMaterial color="#e45b2f" emissive="#e45b2f" emissiveIntensity={0.25} />
        </RoundedBox>
      </Float>

      <Float speed={2.1} floatIntensity={0.55} rotationIntensity={0.22}>
        <RoundedBox ref={shardRight} args={[0.42, 1.02, 0.08]} radius={0.04} smoothness={4} position={[1.15, -0.08, -0.25]} castShadow rotation={[-0.14, -0.42, 0.14]}>
          <meshStandardMaterial color="#1f8d85" emissive="#1f8d85" emissiveIntensity={0.22} />
        </RoundedBox>
      </Float>

      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.15}>
        <mesh position={[0, 1.1, -0.3]} castShadow>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#f4c48f" metalness={0.18} roughness={0.35} />
        </mesh>
      </Float>

      <Html position={[0, -0.85, 0.35]} transform occlude>
        <div className="scene-screen-ui">
          <span>signal stack</span>
          <strong>Java + Angular + OpenSearch</strong>
        </div>
      </Html>
    </group>
  )
}

export function HeroCanvas() {
  return (
    <div className="canvas-shell">
      <Canvas camera={{ position: [0, 0.9, 5.4], fov: 42 }} dpr={[1, 1.6]} shadows>
        <color attach="background" args={['#121c2b']} />
        <fog attach="fog" args={['#121c2b', 6, 10]} />
        <ambientLight intensity={0.7} color="#f4e6d7" />
        <directionalLight position={[2.4, 4, 3]} intensity={1.3} color="#fff6e8" castShadow />
        <pointLight position={[1.8, 1.4, 1.4]} intensity={4.2} color="#7de8d4" />
        <pointLight position={[-1.6, 0.4, 1.1]} intensity={2.6} color="#e45b2f" />
        <pointLight position={[0, -1.2, 1.2]} intensity={1.2} color="#1a3a50" />

        <SignalArchitecture />
      </Canvas>
    </div>
  )
}
