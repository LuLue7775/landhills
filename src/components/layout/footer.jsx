import { StyledFooter } from '@/styles/styles'
import useStore from '@/helpers/store'
import React from 'react'

export default function Footer() {
    const router = useStore((state) => {
        if (!state.router) return
        return state.router.pathname.charAt(1).toUpperCase() + state.router.pathname.slice(2)
    })
    return (
        <StyledFooter>
            <p> 受保護的內容: {router}  </p>
        </StyledFooter>
    )
}
