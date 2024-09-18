import { isVisible } from 'ckeditor5';
import { useState, useEffect, useRef } from 'react';

export default function useModalVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };
    useEffect(() => {
        if (initialIsVisible) {
            console.log(isComponentVisible)
        }

        if (isComponentVisible) {
            document.getElementById('layout').style
            document.getElementById('layout').style.filter = "opacity(50%)"

        }
        else {
            document.getElementById('layout').style.filter = ""
        }

    }, [isComponentVisible])
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return [ref, isComponentVisible, setIsComponentVisible];
}