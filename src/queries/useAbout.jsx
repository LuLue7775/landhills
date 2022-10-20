
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'

export default function useAbout() {
    const { data: about, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: 'about',
        queryFn: async () => {
            const data = await client(`about`)
            return data
        },
        refetchOnMount: false

        // config: { // for queryCache
        //     onSuccess(about) {
        //     },
        // },
    })

    return {
        about, error, isLoading, isError, isSuccess
    }
}
