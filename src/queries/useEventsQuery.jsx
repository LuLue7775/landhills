
import { useQuery } from '@tanstack/react-query'
import { client } from './api-client'

export const getEvents = async () => {
    return await client(`events`)
}

export default function useEventsQuery() {
    const { data: events, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
        refetchOnMount: false,
        onError: (error) => { throw error }
    })

    return {
        events, error, isLoading, isError, isSuccess
    }
}
