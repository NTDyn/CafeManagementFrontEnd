import React from "react";
import { useSelector } from "react-redux";
import '../../css/components/Loading/index.css'

const Loading = () => {
    const loading = useSelector((state) => state.apiRequestReducer.loading);

    if (!loading) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-spinner">Loading...</div>
        </div>
    );
};

export default Loading;
