import LoginPage from "./LoginPage";
import HomePage from './HomePage'
import { useState } from "react";

export default function Main() {

    const [page, setPage] = useState("login")

    switch (page) {
        case "login":
            return <LoginPage page={page} setPage={setPage} />
        case "home":
            return <HomePage page={page} setPage={setPage} />
        default:
            return <LoginPage page={page} setPage={setPage} />
    }
}