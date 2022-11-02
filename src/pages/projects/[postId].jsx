import { useProjectSingleStore } from '@/helpers/store'
import {
    StyledWrap,
    StyledCover,
    StyledProjectGrid,
    StyledProjectContent,
    StyledProjectTitle,
    StyledText,
    StyledProjectCoverImageContainer,
    StyledRow,
    StyledItems,
    StyledImage
} from '@/styles/styles'
import { useEffect } from 'react'
import Image from 'next/image'

export default function ProjectsSinglePage({ data }) {
    const { filteredProjectContent, setFilterdProjects } = useProjectSingleStore()

    useEffect(() => {
        const filterdData = {
            title: data?.title.rendered,
            coverImage: data?.project_cover_image.guid,
            content: data?.content.rendered,
            images: data?.project_images,
            date: data?.project_date
        }
        setFilterdProjects(filterdData)
    }, [data])

    return (
        <StyledWrap>
            <StyledCover>
                <StyledProjectGrid>
                    <StyledProjectContent>
                        <StyledProjectTitle> {filteredProjectContent?.title} </StyledProjectTitle>
                        <StyledText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(filteredProjectContent?.content) }} />
                    </StyledProjectContent>
                    <StyledProjectCoverImageContainer>
                        <Image
                            className="image"
                            draggable="false"
                            src={filteredProjectContent.coverImage}
                            alt="image"
                            layout="responsive"
                            height="100"
                            width="100"
                            objectFit="contain" />
                    </StyledProjectCoverImageContainer>
                </StyledProjectGrid>
            </StyledCover>

            <StyledRow>
                {filteredProjectContent?.images?.map(imageData => (
                    <StyledItems key={imageData.id}>
                        <StyledImage
                            className="images"
                            draggable="false"
                            src={imageData.guid}
                            alt="image"
                        />
                    </StyledItems>
                ))}
            </StyledRow>
        </StyledWrap>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`https://landhills.co/wp-json/wp/v2/projects`)
    const id = await res.json()
    const idArr = id?.reduce((filteredIdArr, data) => {
        filteredIdArr.push({
            params: { postId: `${data.id}` }
        })
        return filteredIdArr
    }, [])

    return {
        paths: idArr,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://landhills.co/wp-json/wp/v2/projects/${params.postId}`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}