// import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import useStore from '@/helpers/store'
import { shaderMaterial } from '@react-three/drei'

// import vertex from './glsl/shader.vert'
// import fragment from './glsl/shader.frag'
import { shaderPosTable } from '@/utils/useViewport'
import { useMeshRefStore } from '@/helpers/store'
import useViewport from '@/utils/useViewport'
import gsap from 'gsap'

// const ColorShiftMaterial = shaderMaterial(
//   {
//     time: 0,
//     color: new THREE.Color(0.05, 0.0, 0.025),
//   },
//   vertex,
//   fragment
// )

// // This is the 🔑 that HMR will renew if this file is edited
// // It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// // @ts-ignore
// ColorShiftMaterial.key = THREE.MathUtils.generateUUID()

// extend({ ColorShiftMaterial })

const toSideAnimation = ({ mesh, viewport }) => {
  gsap.fromTo(mesh.current.position, {
    x: 0,
    y: 0,
  }, {
    x: shaderPosTable[viewport] || 4,
    y: -2,
    duration: 3
  })
}

const Shader = (props) => {

  const router = useStore((s) => s.router)

  const { meshRef, setMeshRef } = useMeshRefStore()
  const mesh = useRef(null)
  useEffect(() => { setMeshRef(mesh) }, [mesh])

  /**
   * Object Rotation 
   */
  useFrame((state, delta) => {
    if (!meshRef.current) return

    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
    }
    // if (meshRef.current.material) {
    //   meshRef.current.material.uniforms.time.value +=
    //     Math.sin(delta / 2) * Math.cos(delta / 2)
    // }
  })

  /**
   * Position depend on viewport
   * @TODO if duration is long, this need to be cancellable
   */
  const viewport = useViewport()

  useEffect(() => {
    // const pos = objectPos % 2 ? 1 : -1
    toSideAnimation({ mesh, viewport })
  }, [viewport, router])

  return (
    <mesh
      ref={mesh}
      // onClick={() => {
      //   router.push(`/projects`)
      // }}
      // onPointerOver={(e) => setHover(true)}
      // onPointerOut={(e) => setHover(false)}
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* @ts-ignore */}
      {/* <colorShiftMaterial key={ColorShiftMaterial.key} time={3} /> */}
    </mesh>
  )
}


export default Shader
