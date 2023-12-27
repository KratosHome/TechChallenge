import React from 'react';
import "./Cats.scss"
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Swiper from "../../component/Swiper/Swiper";
import {Link} from "react-router-dom";

const Cats = () => {
    const {entities, loading, error} = useSelector((state: RootState) => state.cats);

    if (error) return <div>error, reset page...</div>
    if (loading) return <div>loading...</div>
    return (
        <div className="container-cats">
            <Swiper
                isButtonToggle={true}
                cards={entities}
                numberCards={0}
                renderItem={(item: any) => (
                    <div key={item.id} className="container-cats-list">
                        <Link to={`/cats/${item.id}`}>
                            <img src={item.url} alt={item.url}/>
                        </Link>
                    </div>
                )}
            />
        </div>
    );
};

export default Cats;