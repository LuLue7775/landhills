import { useEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';

export const table = { 'mobile': 1, 'tablet': 2.5, 'desktopSM': 5, 'desktopLG': 6 }

export default function useViewport() {
    const isMobile = useMediaQuery('screen and (min-width: 1px) and (max-width: 513px)');
    const isTablet = useMediaQuery('screen and (min-width: 514px) and (max-width: 1025px)');
    const isDesktopSM = useMediaQuery('screen and (min-width: 1026px) and (max-width: 1920px)');
    const isDesktopLG = useMediaQuery('(min-width: 1920px)');

    const [viewport, setViewport] = useState(0)
    useEffect(() => {
        if (isMobile) setViewport('mobile')
        if (isTablet) setViewport('tablet')
        if (isDesktopSM) setViewport('desktopSM')
        if (isDesktopLG) setViewport('desktopLG')
    }, [isMobile, isTablet, isDesktopSM, isDesktopLG])

    return viewport
}