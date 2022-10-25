import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StyledNav } from '@/styles/styles'

export default function Nav({ isMenuOpened, setMenuOpen }) {
    return (
        <StyledNav className="Nav">
            <Link href="/">
                <a>
                    <Image
                        src="/img/logo.png"
                        alt="logo"
                        layout="fixed"
                        height="15"
                        width="100"
                        objectFit="contain"
                    />
                </a>
            </Link>
            <button onClick={() => setMenuOpen(!isMenuOpened)}> MENU </button>
        </StyledNav>
    )
}
