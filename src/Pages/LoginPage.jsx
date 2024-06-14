export default function LoginPage({page,setPage}){

    return(

        <div className="login">

            <input type="text" />
            <input type="password" />
            <button onClick={()=>setPage("home")}>Login</button>
            <button>Sign Up</button>
        </div>
    );
}