import { setState } from '@/helpers/store'
import { useEffect, useRef } from 'react'
import Nav from '../nav'

const Layout = ({ children }) => {
  const ref = useRef(null)
  useEffect(() => {
    setState({ dom: ref })
  }, [])

  return (
    <div
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom'
      ref={ref}
    >
      <Nav />

      {children}
    </div>
  )
}

export default Layout
