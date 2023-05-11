import Nav from '../nav'
import Menu from './menu'
import { StyledLayout } from '@/styles/styles'
import { setState, useAsPathInitializer } from '@/helpers/store'
import useStore from '@/helpers/store'
import Footer from './footer'
import { useState, useEffect, useRef } from 'react'

const Layout = ({ children }) => {
  useAsPathInitializer()

  const [isMenuOpened, setMenuOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setState({ dom: ref })
  }, [])

  const router = useStore((state) => {
    if (!state.router) return
    if (state.router.pathname === "/projects/[projectId]") return ""
    return state.router.pathname.charAt(1).toUpperCase() + state.router.pathname.slice(2)
  })

  return (
    <StyledLayout
      className='Layout'
      ref={ref}
    >
      <Nav isMenuOpened={isMenuOpened} setMenuOpen={setMenuOpen} router={router} />
      <Menu isMenuOpened={isMenuOpened} setMenuOpen={setMenuOpen} />
      <Footer router={router} />

      {children}
    </StyledLayout>
  )
}

export default Layout
