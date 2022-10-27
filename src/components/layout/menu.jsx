
import React from 'react'
import useStore from '@/helpers/store'
import useBrandInfo from '@/queries/useBrandInfo'
import DOMPurify from 'isomorphic-dompurify'
import { StyledMenu, StyledText, StyledMenuUl, StyledMenuInfo, StyledLink, StyledCloseButton } from '@/styles/styles'
import Link from 'next/link'

export default function Menu({ isMenuOpened, setMenuOpen }) {
    const router = useStore((state) => state.router)
    const { brandInfo, error, isLoading, isSuccess } = useBrandInfo()
    const { info_content } = brandInfo?.[0] || []

    return (
        isMenuOpened &&
        <StyledMenu>
            <StyledMenuUl className='font-sans text-xl md:text-3xl'>
                <li className="nav-item">
                    <StyledLink
                        href="/projects"
                        className="nav-link"
                        onClick={() => {
                            router.push(`/projects`)
                        }}
                    > PROJECTS </StyledLink>
                </li>
                <li className="nav-item">
                    <StyledLink
                        href="/objects"
                        className="nav-link"
                        onClick={() => {
                            router.push(`/objects`)
                        }}
                    > OBJECTS </StyledLink>
                </li>
                <li className="nav-item">
                    <StyledLink
                        href="/archive"
                        className="nav-link"
                        onClick={() => {
                            router.push(`/archive`)
                        }}
                    > ARCHIVE </StyledLink>
                </li>
                <li className="nav-item">
                    <StyledLink
                        href="/events"
                        className="nav-link"
                        onClick={() => {
                            router.push(`/events`)
                        }}
                    > EVENTS </StyledLink>
                </li>
                <li className="nav-item">
                    <StyledLink
                        href="/about"
                        className="nav-link"
                        onClick={() => {
                            router.push(`/about`)
                        }}
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
