import Nav from '../nav'
import Menu from './menu'
import { StyledLayout } from '@/styles/styles'
import { setState } from '@/helpers/store'
import { useState, useEffect, useRef } from 'react'
import Footer from './footer'

const Layout = ({ children }) => {
  const [isMenuOpened, setMenuOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setState({ dom: ref })
  }, [])

  return (
    <StyledLayout
      className='Layout'
      ref={ref}
    >
      <Nav isMenuOpened={isMenuOpened} setMenuOpen={setMenuOpen} />
      <Menu isMenuOpened={isMenuOpened} setMenuOpen={setMenuOpen} />

      {children}
      <Footer />
    </StyledLayout>
  )
}

export default Layout
