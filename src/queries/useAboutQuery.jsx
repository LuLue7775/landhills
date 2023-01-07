
import { useQuery } from '@tanstack/react-query'
import { client } from './api-client'

export const getAbout = async () => {
    return await client(`about`)
}

export default function useAboutQuery() {
    const { data: about, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['about'],
        queryFn: getAbout,
        refetchOnMount: false,
        onError: (error) => { throw error }
    })

    return {
        about, error, isLoading, isError, isSuccess
    }
}
