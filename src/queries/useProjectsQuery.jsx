
import { useCallback, useMemo } from 'react'
import { useQuery, queryCache } from 'react-query'
import { client } from './api-client'


export const getProjects = async () => {
    // const data = await client(`projects`)
    const data = await fetch(`https://landhills.co/wp-json/wp/v2/projects`, { method: 'GET' })
        .then(response => response.json())

    return data
}

/**
 * @TODO 在此吐隨機順序，/achive /projects都可以用
 */
const transformProjects = (data) => data?.reduce((filteredData, project, index) => {
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
        queryKey: 'projects',
        queryFn: getProjects,
        refetchOnMount: false,
        // initialData: projects,
        select: useCallback((data) => transformProjects(data), [])
    })

    return {
        projects, error, isLoading, isError, isSuccess
    }
}


export const getSingleProject = async (projectId) => {
    // const data = await client(`projects`)
    const data = await fetch(`https://landhills.co/wp-json/wp/v2/projects/${projectId}`, { method: 'GET' })
        .then(response => response.json())

    return data
}


export function useSingleProjectQuery(projectId) {
    const { data: project, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: `project-${projectId}`,
        queryFn: async () => await getSingleProject(projectId)
    });

    return {
        project, error, isLoading, isError, isSuccess
    }
}


