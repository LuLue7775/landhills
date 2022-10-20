
import React from 'react'
import useStore from '@/helpers/store'
import useBrandInfo from '@/queries/useBrandInfo'
import DOMPurify from 'isomorphic-dompurify'


export default function Menu({ isMenuOpened }) {
    const router = useStore((state) => state.router)
    const { brand_info, error, isLoading, isSuccess } = useBrandInfo()
    const { info_content } = brand_info?.[0] || []

    return (
        isMenuOpened &&
        <>
            <ul className='font-sans text-xl md:text-3xl'>
                <li className="nav-item">
                    <a className="nav-link"
                        onClick={() => {
                            router.push(`/projects`)
                        }}
                    > PROJECTS </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"
                        onClick={() => {
                            router.push(`/objects`)
                        }}
                    > OBJECTS </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"
                        onClick={() => {
                            router.push(`/archive`)
                        }}
                    > ARCHIVE </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"
                        onClick={() => {
                            router.push(`/events`)
                        }}
                    > EVENTS </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"
                        onClick={() => {
                            router.push(`/about`)
                        }}
                    > ABOUT </a>
                </li>
            </ul>

            {isSuccess
                ? <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info_content) }} />
                : isLoading
                    ? <p> Loader </p>
                    : <p> {error} </p>
            }
        </>
    )
}
