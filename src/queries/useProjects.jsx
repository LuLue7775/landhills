
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'

export default function useProjects() {
    const { data: projects, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: 'projects',
        queryFn: async () => {
            const data = await client(`projects`)
            return data
        },
        refetchOnMount: false
        // config: { // for queryCache
        //     onSuccess(about) {
        //     },
        // },
    })

    return {
        projects, error, isLoading, isError, isSuccess
    }
}
