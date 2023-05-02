import useStore from '@/helpers/store';
import { useMeshRefStore } from '@/helpers/store'
import gsap from 'gsap'

const backToCenterAnimation = ({ meshRef }) => {
    gsap.fromTo(meshRef.current?.position, {
        x: 3,
        y: -2,
    }, {
        x: 0,
        y: 0,
        duration: 2,
    })
}


export default function useDelayRouting(isMenuOpened, setMenuOpen) {
    const { meshRef, setMeshRef } = useMeshRefStore()

    const router = useStore((state) => state.router)

    const startAnimation = () => {
        return new Promise((resolve, reject) => {
            // backToCenterAnimation({ meshRef });

            // storeCurrentMeshpos
            setMeshRef(meshRef)

            // close menu
            setMenuOpen(!isMenuOpened);
            setTimeout(resolve, 3000)
        });
    };

    const routerWrapper = {
        push: (url) => {
            startAnimation().then(() => {
                router.push(url);
            })
        }
    };

    return routerWrapper
}
