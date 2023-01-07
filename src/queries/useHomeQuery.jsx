
import { useQuery } from '@tanstack/react-query'
import { client } from './api-client'

export const getHome = async () => {
    return await client(`home`)
}

export default function useHomeQuery() {
    const { data: home, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['home'],
        queryFn: getHome,
        refetchOnMount: false,
        onError: (error) => { throw error }
    })

    return {
        home, error, isLoading, isError, isSuccess
    }
}
