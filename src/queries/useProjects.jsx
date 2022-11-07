
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'

export const getProjects = async () => {
    // const data = await client(`projects`)

    const data = await fetch(`https://landhills.co/wp-json/wp/v2/projects`, { method: 'GET' })
        .then(response => response.json())

    return data
}

export default function useProjects() {


    const { data: projects, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: 'projects',
        queryFn: getProjects,
        // initialData: projects,
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
