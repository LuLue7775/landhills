
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from './api-client'
import brandInfoJSON from './brandInfo.json'

export const getBrandInfo = async () => {
    return await client(`brand_info`)
}

/**
 * we didn't persist this at local
 * we use initialData instead
 */
export default function useBrandInfoQuery(props) {
    const queryClient = useQueryClient()
    const { data: brandInfo, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['brand_info'],
        queryFn: getBrandInfo,
        refetchOnMount: false,
        onError: (error) => { throw error },
        initialData: () => {
            const brandInfo = queryClient.getQueryData(['brand_info'])
            if (brandInfo) return { data: brandInfo }
            else return brandInfoJSON
        }

    })

    return {
        brandInfo, error, isLoading, isError, isSuccess
    }
}
