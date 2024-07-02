import { useState,useEffect } from "react";

export default function LeftBox({userId,setPage,setTheme}){

    const[name,setName]=useState('');


      // Load name from local storage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('storedName');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // Update local storage whenever name changes
  useEffect(() => {
    localStorage.setItem('storedName', name);
  }, [name]);


    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://taskchamp-one.vercel.app/user/items/" + userId, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setName(result.data.username);
                } else {
                    alert(result.msg);
                }
            })
            .catch((error) => console.error(error));
    }, []);
    





   
    return(

        <div className="left-box">

                <div className="header">

                    <p> <i className="fa-solid fa-user"></i>{name}</p>

                </div>
                <div className="theme-wrap">
                    <h2>Themes</h2>
                    <div className="theme">

                        <div className="beach" onClick={() => setTheme("bucket-list beach")}></div>
                        <div className="mountain" onClick={() => setTheme("bucket-list mountain")}></div>
                        <div className="sky" onClick={() => setTheme("bucket-list sky")}></div>
                        <div className="green" onClick={() => setTheme("bucket-list green")}></div>
                        <div className="eve" onClick={() => setTheme("bucket-list eve")}></div>
                        <div className="nature" onClick={() => setTheme("bucket-list nature")}></div>

                    </div>
                </div>



                <footer>
                    <p onClick={()=>setPage("login")}>  <i className="fa-solid fa-right-from-bracket"></i> Logout</p>
                </footer>

            </div>
    );
}