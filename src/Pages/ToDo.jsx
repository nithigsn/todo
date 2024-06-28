import { useState, useEffect } from "react";
import LeftBox from "../Components/LeftBox";


export default function ToDo({ userId, setPage }) {

    //usestate variables
    const [arr, setArr] = useState([]);
    const [input, setInput] = useState("");



    //change theme 
    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem('theme')) ||
        "bucket-list gradiant");

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);








    function handleSaveBtn() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "_id": userId,
            "items": arr
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3436/user/items", requestOptions)
            .then((response) => response.json())
            .then((result) =>{
                if(result.status){
                    alert(result.msg);
                }
                else{
                    alert(result.msg);
                    console.log(result,arr);
                    console.log(result.data._id);
                }

            })
            .catch((error) => console.error(error));
       
    }



    function handleAdd() {
        if (input !== "") {
            setArr([...arr, input]);
            setInput("");
        }
    }

    function handleDelete(idx) {
        let res = arr.filter((value, index) => index !== idx);
        setArr(res);
    }

    function handleUpdate(idx) {
        let update = prompt("Update your task");
        if (update !== "") {
            arr[idx] = update;
            setArr([...arr])
        }

    }

    return (


        <div className="homepage">
            <LeftBox setTheme={setTheme} setPage={setPage} />


            <div className={theme}>


                <h3>ToDo that will keep you remember</h3>



                <div className="head">
                    <label htmlFor="">Add Your Task</label>

                    <div class="textInputWrapper">
                        <input placeholder="Type Here" type="text" className="textInput" value={input} onChange={(e) => setInput(e.target.value)} />
                    </div>
                    <div className="todo-btn">
                        <div className="add-btn">
                            <button type="button" class="button" onClick={handleAdd}>
                                <span class="button__text">Add Task</span>
                                <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                            </button>
                        </div>
                        <button className="save-btn" onClick={handleSaveBtn}>
                            <span >Save</span></button>
                    </div>

                    <div className="info">
                        <p>  hello</p>
                    </div>
                </div>
                <ol>
                    {arr.map((item, index) => (

                        <div key={index} className="task">

                            <li>{item} </li>

                            <div className="btn">
                                <div>
                                    <button className="button" onClick={() => handleDelete(index)}>
                                        <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                    </button>
                                </div>
                                <button onClick={() => handleUpdate(index)}>Update</button>
                            </div>

                        </div>
                    ))}
                </ol>
            </div>
        </div>
    );
}
