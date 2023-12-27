import React, {FC, ReactNode} from 'react';
import "./MainLayout.scss"
import {Link} from "react-router-dom";

interface MainLayoutProps {
    children: ReactNode;
}


export const MainLayout: FC<MainLayoutProps> = ({children}) => {
    return (
        <div>
            <header>
                <Link to={"/"}>CATS LOGO</Link>
                <div>info</div>
            </header>
            {children}
        </div>
    );
};

export default MainLayout;