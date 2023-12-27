import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MouseCircle.scss';

const MouseCircle: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX - 45, y: e.clientY - 45 });
    };

    const handleMouseEnter = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.add('negative-effect');
    };

    const handleMouseLeave = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.remove('negative-effect');
    };

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200);
    };

    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e);
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('click', handleClick);
        const interactiveElements = document.querySelectorAll('.interactive');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('click', handleClick);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <motion.div
            className="mouse-circle"
            style={{
                translateX: mousePosition.x,
                translateY: mousePosition.y,
            }}
            animate={{
                scale: isClicked ? 0.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, duration: 0.2 }}
        />
    );
};

export default MouseCircle;
