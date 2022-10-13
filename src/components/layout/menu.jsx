
import React from 'react'
import useStore from '@/helpers/store'

export default function Menu() {

    const router = useStore((state) => state.router)

    return (
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
        </>
    )
}
