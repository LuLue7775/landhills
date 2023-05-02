import {
  StyledPages,
  StyledRow,
  StyledItems,
  StyledLoader,
  StyledLoaderContainer,
  StyledImageInfo,
  StyledImage,
} from '@/styles/styles'
import useProjectsQuery, { getProjects, transformProjects } from '@/queries/useProjectsQuery'
import { getAsPath, useMeshRefStore, useObjectScrollStore, useProjectStore } from '@/helpers/store'
import useViewport, { projectShaderPosTable } from '@/utils/useViewport'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query'
import gsap from 'gsap'
import { useRouter } from 'next/router'
import Projects from '@/components/Projects'
import useOnScreen from '@/utils/useOnScreen'


/**
 *  1sec after scroll put move queue
 */
const moveAnimation = ({ meshRef, queue }) => {
  if (!meshRef.current) return
  if (!queue[1]) return
  console.log(meshRef.current.position)

  gsap.to(meshRef.current.position, {
    x: queue[1].x,
    y: queue[1].y,
    duration: 2,
    ease: 'none'
  })
}
/**
 *  handle queue jobs
 */
const addNewPosToQueue = ({ animationQueueRef, viewport }) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      let getRandom = Math.floor(Math.random() * 4);
      // const newPos = projectShaderPosTable[viewport][getRandom]

      const halfX = projectShaderPosTable[viewport][3].x
      const halfY = projectShaderPosTable[viewport][0].y
      const newPosX = Math.random() * halfX * 2.5 - halfX
      const newPosY = Math.random() * halfY * 2.5 - halfY


      animationQueueRef.current.push({ x: newPosX, y: newPosY })
      console.log(animationQueueRef.current)
      resolve()
    }, 1000)
  })
}


async function fetchProjects(page) {
  try {
    const project = fetch(`https://landhills.co/wp-json/wp/v2/projects?per_page=20&page=${page}`)
      .then((res) => {
        // console.log(res.headers.get('Link'))
        // console.log(res.headers.get('X-WP-Total'))
        // console.log(res.headers.get('X-WP-TotalPages'))
        // console.log(res.json())
        return res.json()
      })
    // console.log('X-WP-Total ', data.headers)
    // const project = await data.json()
    return project
  } catch (err) {
    return err
  }
}


/** @TODO transform 和randomize要分兩個func  */
function randomizeData(data) {
  // console.log('data', data)
  if (!data) return
  return transformProjects(data).sort(() => Math.random() - 0.5)
}
async function handleData(project) {
  const randData = randomizeData(project)
  return randData
}

const Page = ({ projects, projectsTotalPageHeader }) => {
  const {
    firstpageProjectPool, setFirstpagefirstpageProjectPool,
    requestPage, setRequestPage,
  } = useProjectStore()


  /**
   * Random on refresh, previous route that's not from single project.
   */
  useEffect(() => {
    if (!getAsPath().currentAsPath) return
    if (!getAsPath().currentAsPath.startsWith('/projects')) {
      const newProjectOrder = firstpageProjectPool.sort(() => Math.random() - 0.5)
      setFirstpagefirstpageProjectPool(newProjectOrder)
    }
  }, [])

  useEffect(() => {
    // 目前只加入頭20個(第一頁)。返回時保留此順序
    // 若換頁則要變換順序(這20個random)
    if (firstpageProjectPool.length >= 20) return
    setFirstpagefirstpageProjectPool(projects)
  }, [projects])

  /**
   * Detect if reaching bottom
   */
  const bottomRef = useRef()
  const inView = useOnScreen(bottomRef)
  // console.log(inView)
  useEffect(() => {
    if (!inView) return
    if (requestPage > parseInt(projectsTotalPageHeader)) return
    setRequestPage()
  }, [inView])

  /**
   * Fetch new pages
   */
  const [newComingIn, setComingIn] = useState()
  useEffect(() => {
    if (requestPage > parseInt(projectsTotalPageHeader)) return

    async function fetchNew() {
      const project = await fetchProjects(requestPage)
      const newSeq = await handleData(project)
      // console.log("newSeq ", newSeq)
      setComingIn(newSeq)
      // if (Array.isArray(project)) {
      //   // setHasNextPage(true)
      //   // const newSeq = await handleData(project)
      // } else {
      //   setHasNextPage(false)
      // }
    }

    fetchNew()
  }, [requestPage])

  // useEffect(() => {
  //   console.log('newComingIn', newComingIn)
  // }, [requestPage])



  /** @TODO useProjectsQuery unable to fetch */
  const { isLoading } = useProjectsQuery()
  // const queryClient = useQueryClient()

  /**
   * Detect scroll behavior, move mesh after 2sec scrolled. 
   * Move back to center when route change.
   */
  const [scrollPos, setScrollPos] = useState(0)
  const scrollRef = useRef()
  useEffect(() => {
    const scrollPos = scrollRef.current
    // detect scroll stop
    let timer = null;
    const handleScrollStopped = () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        setScrollPos(scrollPos.scrollTop)
      }, 350);
    }

    scrollPos?.addEventListener('scroll', handleScrollStopped)
    return () => scrollPos?.removeEventListener('scroll', handleScrollStopped)
  }, [])

  const viewport = useViewport()
  const { meshRef } = useMeshRefStore()
  const animationQueueRef = useRef([])

  useEffect(() => {
    // console.log("scrollPos", scrollPos)
    if (!viewport) return
    const waitFor3 = async () => {
      addNewPosToQueue({ animationQueueRef, viewport })
        .then(() => { return moveAnimation({ meshRef, queue: animationQueueRef.current }) })
        .then(() => {
          if (animationQueueRef.current.length > 2) animationQueueRef.current.shift()
          if (animationQueueRef.current.length > 4) animationQueueRef.current.slice(0, 3)
        })
    }
    waitFor3()

    // delete jobs if job exceed certain number

  }, [scrollPos, meshRef.current])


  return (
    isLoading ?
      <StyledLoaderContainer>
        <StyledLoader />
      </StyledLoaderContainer>
      :
      <StyledPages ref={scrollRef}>
        <StyledRow >

          <Projects firstpageProjectPool={firstpageProjectPool} newComingIn={newComingIn} />
          <div ref={bottomRef} style={{ transform: 'translateY(120%)', height: '50%', width: '100%', }}> - </div>

        </StyledRow>
      </StyledPages>


  )
}

Page.r3f = (props) => (
  <>
  </>
)

export default Page

/**
 * either prefetch or fetch with ISR
 * @TODO make this react-query again
 */
export async function getServerSideProps(context) {
  // const queryClient = new QueryClient()
  // const data = await queryClient.fetchQuery(['projects'], getProjects)
  let projectsTotalPageHeader
  const project = await fetch(`https://landhills.co/wp-json/wp/v2/projects?per_page=20`)
    .then((res) => {
      projectsTotalPageHeader = res.headers.get('X-WP-TotalPages')
      return res.json()
    });

  const sortedData = transformProjects(project).sort(() => Math.random() - 0.5)

  /**
   * @TODO pagination here
   * err msg: \u8981\u6c42\u7684\u9801\u78bc\u5927\u65bc\u5be6\u969b\u9801\u6578\u3002
   * https://landhills.co/wp-json/wp/v2/projects?per_page=20&page=3
   * page index state要useRef 
   */

  /**
   * @WANRING Now we are not using our custom hook
   */
  return {
    props: {
      title: 'Projects',
      // dehydratedState: dehydrate(queryClient),
      projects: sortedData,
      projectsTotalPageHeader: projectsTotalPageHeader
    },
  }
}
