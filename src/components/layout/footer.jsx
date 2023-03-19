import { StyledFooter } from '@/styles/styles'
import useStore from '@/helpers/store'
import React from 'react'

export default function Footer() {
    const router = useStore((state) => {
        if (!state.router) return
        if (state.router.pathname === "/projects/[projectId]") return ""
        return state.router.pathname.charAt(1).toUpperCase() + state.router.pathname.slice(2)
    })

    // if (router === '/' || router === )
    return (
        <StyledFooter>
            <p> {router}  </p>
        </StyledFooter>
    )
}
