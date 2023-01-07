
import { useQuery } from '@tanstack/react-query'
import { client } from './api-client'

export const getObjects = async () => {
    return await client(`objects`)
}

export default function useObjectsQuery() {
    const { data: objects, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['objects'],
        queryFn: getObjects,
        refetchOnMount: false,
        onError: (error) => { throw error }
    })

    return {
        objects, error, isLoading, isError, isSuccess
    }
}
