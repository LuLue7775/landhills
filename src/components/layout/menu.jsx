
// import useStore from '@/helpers/store'
import useBrandInfo from '@/queries/useBrandInfo'
import { StyledMenu, StyledText, StyledMenuUl, StyledMenuInfo, StyledLink, StyledCloseButton } from '@/styles/styles'
import { useObjectScrollStore } from '@/helpers/store'
import useDelayRouting from '@/utils/useDelayRouting'

import DOMPurify from 'isomorphic-dompurify'
import React, { useEffect, useReducer, useRef } from 'react'

export default function Menu({ isMenuOpened, setMenuOpen }) {
    // const router = useStore((state) => state.router)
    const routerWrapper = useDelayRouting(isMenuOpened, setMenuOpen)

    const { brandInfo, error, isLoading, isSuccess } = useBrandInfo()
    const { info_content } = brandInfo?.[0] || []

    // const { objectPos, setObjectPos } = useObjectScrollStore()
    const menuRef = useRef()
    useEffect(() => {
        function handleClick(e) {
            if (!document.getElementById('menu').contains(e.target)) setMenuOpen(!isMenuOpened)
        }

        menuRef.current?.addEventListener('click', (e) => handleClick(e))
        return menuRef.current?.removeEventListener('click', () => handleClick)
    }, [isMenuOpened])

    return (
        isMenuOpened &&
        <StyledMenu ref={menuRef}>
            <div id="menu" style={{ height: "100%", width: "25%" }}>
                <StyledMenuUl >
                    <li className="nav-item">
                        <StyledLink
                            // href="/projects" // we dont use native href because we need to use the route state. see useDelayRouting
                            onClick={() => routerWrapper.push('/projects')}
                        > PROJECTS </StyledLink>
                    </li>
                    <li className="nav-item">
                        <StyledLink
                            onClick={() => routerWrapper.push(`/objects`)}
                        > OBJECTS </StyledLink>
                    </li>
                    <li className="nav-item">
                        <StyledLink
                            onClick={() => routerWrapper.push(`/archive`)}
                        > ARCHIVE </StyledLink>
                    </li>
                    <li className="nav-item">
                        <StyledLink
                            onClick={() => routerWrapper.push(`/events`)}
                        > EVENTS </StyledLink>
                    </li>
                    <li className="nav-item">
                        <StyledLink
                            onClick={() => routerWrapper.push(`/about`)}
                        > ABOUT </StyledLink>
                    </li>
                </StyledMenuUl>

                {isSuccess
                    ? <StyledMenuInfo>
                        <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info_content) }} />
                    </StyledMenuInfo>
                    : isLoading
                        ? <p> Loader </p>
                        : <p> {error} </p>
                }
            </div>
            <StyledCloseButton onClick={() => setMenuOpen(!isMenuOpened)} />
        </StyledMenu>
    )
}
