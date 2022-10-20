
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'

export default function useEvents() {
    const { data: events, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: 'events',
        queryFn: async () => {
            const data = await client(`events`)
            return data
        },
        refetchOnMount: false
        // config: { // for queryCache
        //     onSuccess(about) {
        //     },
        // },
    })

    return {
        events, error, isLoading, isError, isSuccess
    }
}
