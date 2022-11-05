import useStore, { useMeshRefStore } from '@/helpers/store'
import useViewport from '@/utils/useViewport'
import { useObjectScrollStore } from '@/helpers/store'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'


const BoxComponent = ({ route }) => {

  const router = useStore((s) => s.router)

  const { setMeshRef } = useMeshRefStore()
  const mesh = useRef(null)
  useEffect(() => { setMeshRef(mesh) }, [mesh])

  const [hovered, setHover] = useState(false)

  useFrame((state, delta) => {
    return mesh.current
      ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
      : null
  })

  const { objectPos, setObjectPos } = useObjectScrollStore()

  const viewport = useViewport()
  const table = { 1: 1, 2: 3, 3: 5, 4: 6 }
  useEffect(() => {
    if (viewport === 4) setObjectPos([table[viewport], -2, 0])
    if (viewport === 3) setObjectPos([table[viewport], -2, 0])
    if (viewport === 2) setObjectPos([table[viewport], -2, 0])
    if (viewport === 1) setObjectPos([table[viewport], -2, 0])
  }, [viewport])

  useEffect(() => {
    console.log('first load')
    const pos = objectPos % 2 ? 1 : -1

    gsap.fromTo(mesh.current.position, {
      x: 0,
      y: 0,
      duration: 2
    }, {
      // x: table[viewport] * pos || 4,
      x: 3,
      y: -2,
    })
  }, [])

  /**
   * DONT RUN THIS AFTER FIRST LOAD
   */
  useEffect(() => {
    console.log('mesh.current: ', mesh.current.position)
  }, [mesh.current?.position.x])

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
