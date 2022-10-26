import { useState, useEffect } from 'react'

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ mouseX: null, mouseY: null });

    useEffect(() => {
        const updateMousePosition = ev => {
            setMousePosition({ mouseX: ev.clientX, mouseY: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};
export default useMousePosition;