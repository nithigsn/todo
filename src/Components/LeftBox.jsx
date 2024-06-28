import { useState,useEffect } from "react";

export default function LeftBox({userId,setPage,setTheme}){

   
    return(

        <div className="left-box">

                <div className="header">

                    <p> <i class="fa-solid fa-user"></i>{userId}</p>

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
                    <p onClick={()=>setPage("login")}>  <i class="fa-solid fa-right-from-bracket"></i> Logout</p>
                </footer>

            </div>
    );
}