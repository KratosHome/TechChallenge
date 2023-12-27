import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useParams, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion';
import './Cat.scss';

const Cat = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {entities, loading, error} = useSelector((state: RootState) => state.cats);

    const catIndex = entities.findIndex(cat => cat.id === id);
    const cat = entities[catIndex];

    const handleNavigation = (direction: 'next' | 'prev') => {
        const newIndex = direction === 'next' ? catIndex + 1 : catIndex - 1;
        const newCat = entities[newIndex];
        if (newCat) {
            navigate(`/cats/${newCat.id}`);
        }
    };

    const slideAnimation = {
        initial: {
            x: 1000,
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {duration: 1.35, ease: "easeInOut"}
        },
        exit: {
            x: -1000,
            opacity: 0,
            transition: {duration: 1.35, ease: "easeInOut"}
        }
    };

    if (error) return <div>error, reset page...</div>
    if (loading) return <div>loading...</div>
    if (!cat) return <div>Cat not found</div>
    return (
        <div className="container-cat">
            <AnimatePresence>
                <motion.div
                    key={cat.id}
                    variants={slideAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {catIndex > 0 && <button onClick={() => handleNavigation('prev')}>←</button>}
                    <img src={cat.url} alt={cat.url}/>
                    {catIndex < entities.length - 1 && <button onClick={() => handleNavigation('next')}>→</button>}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Cat;
