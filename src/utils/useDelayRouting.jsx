import useStore from '@/helpers/store';
import { useMeshRefStore } from '@/helpers/store'
import gsap from 'gsap'


export default function useDelayRouting() {
    const { meshRef } = useMeshRefStore()
    const backtoCenterAnimation = () => {
        gsap.fromTo(meshRef.current?.position, {
            x: 3,
            y: -2,
            duration: 2,
        }, {
            x: 0,
            y: 0
        })
    }

    const router = useStore((state) => state.router)

    const startAnimation = () => {
        return new Promise((resolve, reject) => {
            backtoCenterAnimation()
            setTimeout(resolve, 2000)
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
