
// import useStore from '@/helpers/store'
import useBrandInfoQuery from '@/queries/useBrandInfoQuery'
import { StyledMenu, StyledText, StyledMenuUl, StyledMenuInfo, StyledLink, StyledCloseButton, StyledMenuWrap } from '@/styles/styles'
import useDelayRouting from '@/utils/useDelayRouting'

import DOMPurify from 'isomorphic-dompurify'
import React, { useEffect, useRef } from 'react'

export default function Menu({ isMenuOpened, setMenuOpen }) {
    const routerWrapper = useDelayRouting(isMenuOpened, setMenuOpen)

    const { brandInfo, error, isLoading, isSuccess } = useBrandInfoQuery()
    const { info_content } = brandInfo?.[0] || []

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
            <StyledMenuWrap id="menu">
                <StyledMenuUl>
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
            </StyledMenuWrap>
            <StyledCloseButton onClick={() => setMenuOpen(!isMenuOpened)} />
        </StyledMenu>
    )
}
