import { useState } from "react";

export default function SignUpPage({ setPage, setUserId }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');


    function handleSignUp() {
        if (password === confirmpassword) {
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

            fetch("http://localhost:3436/user/sign-up", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        setUserId(result.data._id);
                        setPage('home');
                        console.log(result.data._id)
                    }
                })
        }
        else {
            alert("fill up")
        }
    }

    return (
        <div className="signup">
            <div className="group">
            <i class="fa-regular fa-user"></i>
                <input className="input" type="username" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>

            <div className="group">
                <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
                    <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
                <input className="input" type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="group">
                <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
                    <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
                <input className="input" type="password" placeholder="confirm password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div>

    

            <div className="sign-up-btn">
                <button onClick={handleSignUp}  ><span>
                    Submit</span></button>
                <button onClick={() => setPage('login')}> <span>Sign In</span></button>
            </div>

        </div>
    );
}