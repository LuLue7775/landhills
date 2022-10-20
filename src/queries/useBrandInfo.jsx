
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'

export default function useBrandInfo() {
    const { data: brand_info, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: 'brand_info',
        queryFn: async () => {
            const data = await client(`brand_info`)
            return data
        },
        refetchOnMount: false
        // config: { // for queryCache
        //     onSuccess(about) {
        //     },
        // },
    })

    return {
        brand_info, error, isLoading, isError, isSuccess
    }
}
