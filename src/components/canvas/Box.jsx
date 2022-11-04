import useStore from '@/helpers/store'
import useViewport from '@/utils/useViewport'
import { useObjectScroll } from '@/helpers/store'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const BoxComponent = ({ route }) => {
  const router = useStore((s) => s.router)

  const mesh = useRef(null)

  const [hovered, setHover] = useState(false)

  useFrame((state, delta) => {
    return mesh.current
      ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
      : null
  })

  const [pos, setPos] = useState([])
  const viewport = useViewport()
  const table = { 1: 1, 2: 3, 3: 5, 4: 6 }
  const { objectPos } = useObjectScroll()

  useEffect(() => {
    if (viewport === 4) setPos([table[viewport], -2, 0])
    if (viewport === 3) setPos([table[viewport], -2, 0])
    if (viewport === 2) setPos([table[viewport], -2, 0])
    if (viewport === 1) setPos([table[viewport], -2, 0])
  }, [viewport])

  useEffect(() => {
    const pos = objectPos % 2 ? 1 : -1

    gsap.to(mesh.current.position, {
      x: table[viewport] * pos || 4,
      duration: 2,
      // onUpdate: () => {
      //   console.log(mesh.current.position)
      // }
    })
  }, [objectPos])


  return (
    <>
      <mesh
        ref={mesh}
        onClick={() => router.push(route)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.5 : 1}
        position={pos}
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
