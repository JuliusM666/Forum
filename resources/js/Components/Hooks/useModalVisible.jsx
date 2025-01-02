import { useState, useEffect, useRef } from 'react';

export default function useModalVisible(initialIsVisible, relatedElement = null) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);
    const handleClickOutside = (event) => {

        if (ref.current && !ref.current.contains(event.target)) {
            if (!relatedElement || document.getElementsByClassName(relatedElement).length == 0 || !document.getElementsByClassName(relatedElement)[0].contains(event.target)) {
                setIsComponentVisible(false);
            }
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return [ref, isComponentVisible, setIsComponentVisible];
}