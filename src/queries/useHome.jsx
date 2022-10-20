
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'

export default function useHome() {
    const { data: home, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: 'home',
        queryFn: async () => {
            const data = await client(`home`)
            return data
        },
        refetchOnMount: false
        // config: { // for queryCache
        //     onSuccess(about) {
        //     },
        // },
    })

    return {
        home, error, isLoading, isError, isSuccess
    }
}
