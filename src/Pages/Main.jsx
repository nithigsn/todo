import LoginPage from "./LoginPage";
import { useState, useEffect } from "react";
import SignUpPage from "./SignUpPage";
import ToDo from "./ToDo";
import Loader from "./Loader";
import LeftBox from "../Components/LeftBox";

export default function Main() {
    // UseState Variables
    const [userId, setUserId] = useState('');


    //UseState to Switch Pages Using Switch 

    //using local storage to store states to avoid changing states when reloading
    const [page, setPage] = useState(

        JSON.parse(localStorage.getItem('page')) || "login"
    );

    useEffect(() => {
        localStorage.setItem('page', JSON.stringify(page));
    }, [page]);



    //loading page 
    const [isLoading, setIsLoading] = useState(false);


    //if loading page is home  will activate
    const handlePageChange = (newPage) => {
        if (newPage === 'home') {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setPage(newPage);
            }, 3000);
        } else {
            setPage(newPage);
        }
    };

    if (isLoading) {
        return <Loader />;
    }


    //switch case to switch pages
    switch (page) {
        case "login":
            return <LoginPage page={page} setPage={handlePageChange} userId={userId} setUserId={setUserId} />;
        case "home":
            return <ToDo page={page} setPage={handlePageChange} userId={userId} setUserId={setUserId} />;
        case "sign-up":
            return <SignUpPage page={page} setPage={handlePageChange} userId={userId} setUserId={setUserId} />;
        case "theme":
            return <LeftBox page={page} setPage={handlePageChange} userId={userId} setUserId={setUserId} />;
        default:
            return <LoginPage page={page} setPage={handlePageChange} userId={userId} setUserId={setUserId} />;
    }
}
