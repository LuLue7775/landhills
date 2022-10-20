
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'

export default function useObjects() {
    const { data: objects, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: 'objects',
        queryFn: async () => {
            const data = await client(`objects`)
            return data
        },
        refetchOnMount: false
        // config: { // for queryCache
        //     onSuccess(about) {
        //     },
        // },
    })

    return {
        objects, error, isLoading, isError, isSuccess
    }
}
