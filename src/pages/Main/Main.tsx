import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import "./Main.scss"
import {Link} from "react-router-dom";

const Main = () => {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({x: e.clientX, y: e.clientY});
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const calculatePosition = (initial: any, mouseCoordinate: any, windowDimension: any) => {
        const movement = (mouseCoordinate - windowDimension / 2) / 150;
        return initial + movement;
    };

    return (
        <div className="container">
            {['open me', 'cats slider', 'open me'].map((text, index) => (
                <motion.div
                    key={index}
                    className="word"
                    style={{
                        top: `${calculatePosition(20 + index * 20, mousePosition.y, window.innerHeight)}%`,
                        left: `${calculatePosition(50, mousePosition.x, window.innerWidth)}%`,
                    }}
                    animate={{
                        x: calculatePosition(0, mousePosition.x, window.innerWidth),
                        y: calculatePosition(0, mousePosition.y, window.innerHeight)
                    }}
                >
                    <Link to={"/cats"}>{text}</Link>
                </motion.div>
            ))}
        </div>
    );
};


export default Main;