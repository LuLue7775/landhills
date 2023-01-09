
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { client } from './api-client'

export const getProjects = async () => {
    return await client(`projects`)
}

/**
 * @TODO 在此吐隨機順序，/achive /projects都可以用
 */
export const transformProjects = (data) => data?.reduce((filteredData, project, index) => {
    filteredData.push({
        id: project.id,
        index: index,
        title: project.title.rendered,
        location: project.project_location,
        type: project.project_category[0].slug,
        year: project.project_date.slice(0, 4),
        no: project.project_number,
        image: project.project_cover_image.guid,
    })

    return filteredData
}, [])

export default function useProjectsQuery() {
    const { data: projects, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
        refetchOnMount: false,
        // initialData: props.dehydratedState,
        // serialize data and randomize data in array. 
        // but randomize causes hydration error. for now we surpress it.
        select: useCallback((data) => transformProjects(data).sort(() => Math.random() - 0.5), []),
        // select: useCallback((data) => transformProjects(data), []),
        onError: (error) => { throw error }
    })

    return {
        projects, error, isLoading, isError, isSuccess
    }
}


export const getSingleProject = async (projectId) => {
    return await client(`projects/${projectId}`)
}

export function useSingleProjectQuery(projectId) {
    const { data: project, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: [`project-${projectId}`],
        queryFn: getSingleProject(projectId),
        onError: (error) => { throw error }
    });

    return {
        project, error, isLoading, isError, isSuccess
    }
}


