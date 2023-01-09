import useStore, { useMeshRefStore } from '@/helpers/store'
import useViewport from '@/utils/useViewport'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'


const BoxComponent = ({ route }) => {

  const router = useStore((s) => s.router)

  const { setMeshRef } = useMeshRefStore()
  const mesh = useRef(null)
  // useEffect(() => { setMeshRef(mesh) }, [mesh])

  const [hovered, setHover] = useState(false)

  useFrame((state, delta) => {
    return mesh.current
      ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
      : null
  })

  const viewport = useViewport()
  const table = { 'mobile': 1, 'table': 3, 'desktopSM': 5, 'desktopLG': 6 }
  useEffect(() => {
    gsap.to(mesh.current.position, {
      x: table[viewport] || 4,
      y: -2,
    })
  }, [viewport])

  useEffect(() => {
    // const pos = objectPos % 2 ? 1 : -1
    gsap.fromTo(mesh.current.position, {
      x: 0,
      y: 0,
      duration: 2
    }, {
      x: table[viewport] || 4,
      y: -2,
    })
  }, [])

  return (
    <>
      <mesh
        ref={mesh}
        onClick={() => router.push(route)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.5 : 1}
      // position={objectPos}
      >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color={route === '/' ? 'orange' : 'hotpink'} />
      </mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  )
}
export default BoxComponent
