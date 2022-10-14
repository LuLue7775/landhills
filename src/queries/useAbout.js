
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'

export default function useAbout() {
    const { data: aboutPage, status } = useQuery({
        queryKey: 'about-page',
        queryFn: () =>
            client(`pages?slug=about-test`),
        // config: { // for queryCache
        //     onSuccess(aboutPage) {
        //     },
        // },
    })

    return {
        aboutPage, status
    }
}
