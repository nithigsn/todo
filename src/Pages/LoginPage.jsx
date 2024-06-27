import { useState } from "react";

export default function LoginPage({ setPage, setUserId }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function handleSignIn() {
        if (username !== "" && password !== "") {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "username": username,
                "password": password
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("http://localhost:3436/user/sign-in", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        setUserId(result.data._id);
                        setPage('home');
                    }
                    else {
                        alert('error')
                    }
                })

        }
    }

    return (

        <div className="login">

            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="enter your username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter your password" />
            <button onClick={handleSignIn}>Login</button>
            <button onClick={() => setPage('sign-up')}>Sign Up</button>
        </div>
    );
}