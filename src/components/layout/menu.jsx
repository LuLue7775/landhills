
import useStore from '@/helpers/store'
import useBrandInfo from '@/queries/useBrandInfo'
import { StyledMenu, StyledText, StyledMenuUl, StyledMenuInfo, StyledLink, StyledCloseButton } from '@/styles/styles'
import { useObjectScrollStore } from '@/helpers/store'
import useDelayRouting from '@/utils/useDelayRouting'

import DOMPurify from 'isomorphic-dompurify'
import React, { useEffect, useReducer } from 'react'

export default function Menu({ isMenuOpened, setMenuOpen }) {
    const router = useStore((state) => state.router)

    const routerWrapper = useDelayRouting()

    const { brandInfo, error, isLoading, isSuccess } = useBrandInfo()
    const { info_content } = brandInfo?.[0] || []

    const { objectPos, setObjectPos } = useObjectScrollStore()

    return (
        isMenuOpened &&
        <StyledMenu>
            <StyledMenuUl className='font-sans text-xl md:text-3xl'>
                <li className="nav-item">
                    <StyledLink
                        // href="/projects"
                        className="nav-link"
                        onClick={() => routerWrapper.push('/projects')}
                    > PROJECTS </StyledLink>
                </li>
                <li className="nav-item">
                    <StyledLink
                        // href="/objects"
                        className="nav-link"
                        onClick={() => routerWrapper.push(`/objects`)}
                    > OBJECTS </StyledLink>
                </li>
                <li className="nav-item">
                    <StyledLink
                        // href="/archive"
                        className="nav-link"
                        onClick={() => routerWrapper.push(`/archive`)}
                    > ARCHIVE </StyledLink>
                </li>
                <li className="nav-item">
                    <StyledLink
                        // href="/events"
                        className="nav-link"
                        onClick={() => routerWrapper.push(`/events`)}
                    > EVENTS </StyledLink>
                </li>
                <li className="nav-item">
                    <StyledLink
                        // href="/about"
                        className="nav-link"
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

            <StyledCloseButton onClick={() => setMenuOpen(!isMenuOpened)} />
        </StyledMenu>
    )
}
