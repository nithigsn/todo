import LoginPage from "./LoginPage";
import HomePage from './HomePage'
import { useState,useEffect } from "react";
import SignUpPage from "./SignUpPage";

export default function Main() {

    const [page, setPage] = useState(
        JSON.parse(localStorage.getItem('page')) ||
        "login");




    useEffect(() => {
        localStorage.setItem('page', JSON.stringify(page));
    }, [page]);
    const [userid, setUserId] = useState('');

    switch (page) {
        case "login":
            return <LoginPage page={page} setPage={setPage} setUserId={setUserId} />
        case "home":
            return <HomePage page={page} setPage={setPage} setUserId={setUserId} />
        case "sign-up":
            return <SignUpPage page={page} setPage={setPage} setUserId={setUserId} />
        default:
            return <LoginPage page={page} setPage={setPage} />
    }
}