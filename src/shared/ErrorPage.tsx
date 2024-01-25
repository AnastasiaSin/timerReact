import React, { useEffect } from "react"
import {  matchPath, useLocation } from "react-router-dom";

export const ErrorPage = ()=>{
    const { pathname } = useLocation();
    const isPostsPath = matchPath("/posts/*", pathname);    
    return (
        <>
        {!isPostsPath && <div><b>404 страница не найдена</b></div>}
        </>
    )
    
}