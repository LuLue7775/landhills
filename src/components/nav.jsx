import { StyledNav } from '@/styles/styles'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav({ isMenuOpened, setMenuOpen }) {
    return (
        <StyledNav className="Nav">
            <Link href="/">
                <Image
                    src="/img/logo.png"
                    alt="logo"
                    height="13"
                    width="88"
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </Link>
            <button onClick={() => setMenuOpen(!isMenuOpened)}
                style={{ fontFamily: "Circular Book" }}> Menu </button>
        </StyledNav>
    )
}
