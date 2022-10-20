import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import Menu from '@/components/layout/menu'
import useHome from '@/queries/useHome'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import DOMPurify from 'isomorphic-dompurify';

// import Shader from '@/components/canvas/Shader/Shader'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})

// dom components goes here
const Page = (props) => {
  const { home, error, isLoading, isError, isSuccess } = useHome()
  const { current_event, home_images } = home?.[0] || []

  const [isMenuOpened, setMenuOpen] = useState(false)

  useEffect(() => {
    console.log(home)
  }, [home])

  return (
    <>
      {/* <Instructions /> */}
      <div className="flex justify-between">
        {/* <Image /> */}
        <div> logo </div>
        <button onClick={() => setMenuOpen(!isMenuOpened)}> MENU </button>
      </div>

      <div className="-z-10">
        {home_images?.map(imageData => (
          <Image
            key={imageData.id}
            src={imageData.image}
            alt=""
            layout="fill"
          // width="100"
          // height="100"
          />
        ))}
      </div>

      <div className="absolute bottom-0" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(current_event) }} />

      <Menu isMenuOpened={isMenuOpened} />
    </>
  )
}

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
    <Shader />
  </>
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
