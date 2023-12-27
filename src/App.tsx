import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchCats } from "./api/fetchCats";
import MainLayout from "./component/MainLayout/MainLayout";
import Main from "./pages/Main/Main";
import Cats from "./pages/Cats/Cats";
import Cat from "./pages/Cat/Cat";
import MouseCircle from "./component/MouseCircle/MouseCircle";
import { motion, AnimatePresence } from 'framer-motion';
import {AppDispatch} from "./store/store";

const routes = [
    {
        id: 1,
        path: '/',
        Component: Main,
        animation: {
            initial: { opacity: 0, x: -100 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 100 },
        }
    },
    {
        id: 2,
        path: '/cats',
        Component: Cats,
        animation: {
            initial: { opacity: 0, x: 100 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -100 },
        }
    },
    {
        id: 3,
        path: '/cats/:id',
        Component: Cat,
        animation: {
            initial: { opacity: 0, y: -100 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 100 },
        }
    }
];

const AnimatedRoute = ({ Component, animation }: any) => (
    <motion.div
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={{ duration: 0.5 }}
    >
        <Component />
    </motion.div>
);

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchCats());
    }, [dispatch]);

    return (
        <MainLayout>
            <MouseCircle />
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    {routes.map(({ id, path, Component, animation }) => (
                        <Route
                            key={id}
                            path={path}
                            element={<AnimatedRoute Component={Component} animation={animation} />}
                        />
                    ))}
                </Routes>
            </AnimatePresence>
        </MainLayout>
    );
}

export default App;
