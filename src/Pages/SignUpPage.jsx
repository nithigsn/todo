import { useState } from "react";

export default function SignUpPage({ setPage, setUserId }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');


    function handleSignUp() {
        if ( password === confirmpassword) {
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

                    }
                })



        }
        else {
            alert("fill up")
        }
    }

    return (
        <div className="signup">
            <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Type Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter password" />
            <input type="password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" />

            <div className="sign-up-btn">
                <button onClick={handleSignUp}  ><span>
                Submit</span></button>
                <button onClick={()=>setPage('login')}> <span>Sign In</span></button>
            </div>

        </div>
    );
}