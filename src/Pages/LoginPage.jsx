import { useState } from "react";

export default function LoginPage({ setPage, setUserId }) {

    //usestate variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    //trigger msg 
    const [trigger, setTrigger] = useState('trigger-msg');




    //function to sign in
    function handleSignIn() {
        if (username !== '' && password !== '') {
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

            fetch("https://taskchamp-one.vercel.app/user/sign-in", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        setUserId(result.data._id);
                        setPage("home");
                        console.log(result.data._id);
                    }
                    else {
                        setTrigger('triggered'); //if username or password is wrong

                    }
                })
                .catch((error) => console.error(error));

        }


    }

    return (



        <div className="login">

            <header>

                <div className="logo-img"></div>
                <h3>Task Champ</h3>

            </header>

            <div className="centerbox">

                <div className="login-box">




                    <div className="loginleft-box">

                        <h2>Welcome Back !</h2>
                        <h3>Tasks are waiting for You </h3>

                    </div>


                    <div className="loginright-box">

                        <form action="">


                            <div className="group">
                                <i className="fa-regular fa-user"></i>
                                <input className="input" type="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className="group">
                                <svg stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
                                    <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
                                </svg>
                                <input className="input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>


                        </form>

                        <div className="login-btn">
                            <button onClick={handleSignIn} >Login</button>
                            <button onClick={() => setPage('sign-up')}>Sign Up</button>
                        </div>



                        {/* if username or password is wrong this will show on screen */}
                        <div className={trigger}>
                            <p>Incorrect Username or Password</p>
                        </div>

                    </div>





                </div>

            </div>





        </div>
    );
}