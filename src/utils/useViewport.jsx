import { useEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';

export default function useViewport() {
    const isMobile = useMediaQuery('screen and (min-width: 1px) and (max-width: 513px)');
    const isTablet = useMediaQuery('screen and (min-width: 514px) and (max-width: 1025px)');
    const isDesktopSM = useMediaQuery('screen and (min-width: 1026px) and (max-width: 1920px)');
    const isDesktopLG = useMediaQuery('(min-width: 1920px)');

    const [viewport, setViewport] = useState(0)
    useEffect(() => {
        if (isMobile) setViewport(1)
        if (isTablet) setViewport(2)
        if (isDesktopSM) setViewport(3)
        if (isDesktopLG) setViewport(4)
    }, [isMobile, isTablet, isDesktopSM, isDesktopLG])

    return viewport
}