import { useState, useEffect } from "react";
import LeftBox from "../Components/LeftBox";

export default function ToDo({ userId, setPage }) {
    //usestate variables
    const [arr, setArr] = useState([]);
    const [input, setInput] = useState("");

    //change theme 
    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem('theme')) || "bucket-list nature "
    );

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    //Load tasks from local storage on component mount
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items'));
        if (storedItems) {
            setArr(storedItems);
        }
    }, []);

    //Gets Users Tasks From Database
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://taskchamp-one.vercel.app/user/items/" + userId, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setArr(result.data.items);
                    localStorage.setItem("items", JSON.stringify(result.data.items));
                } else {
                    alert(result.msg);
                }
            })
            .catch((error) => console.error(error));
    }, [userId]);

    //function to save tasks and send it to Database
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

        fetch("https://taskchamp-one.vercel.app/user/items", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    console.log('Task Saved Successfully');
                } else {
                    console.log('error');
                }
            })
            .catch((error) => console.error(error));
    }

    //function to Add Tasks
    function handleAdd() {
        if (input !== "") {
            const newArr = [...arr, input];
            setArr(newArr);
            localStorage.setItem("items", JSON.stringify(newArr));
            setInput("");
        }
    }

    //function to delete tasks
    function handleDelete(idx) {
        const newArr = arr.filter((_, index) => index !== idx);
        setArr(newArr);
        localStorage.setItem("items", JSON.stringify(newArr));
    }

    //function to update task
    function handleUpdate(idx) {
        let update = prompt("Update your task");
        if (update !== "") {
            const newArr = [...arr];
            newArr[idx] = update;
            setArr(newArr);
            localStorage.setItem("items", JSON.stringify(newArr));
        }
    }

    return (
        <div className="homepage">
            <LeftBox setTheme={setTheme} setPage={setPage} userId={userId} />
            <div className={theme}>
                <h3>ToDo that will keep you remember</h3>
                <div className="head">
                    <label htmlFor="">Add Your Task</label>
                    <div className="textInputWrapper">
                        <input placeholder="Type Here" type="text" className="textInput" value={input} onChange={(e) => setInput(e.target.value)} />
                    </div>
                    <div className="todo-btn">
                        <div className="add-btn">
                            <button type="button" className="button" onClick={handleAdd}>
                                <span className="button__text">Add Task</span>
                                <span className="button__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                                        <line y2="19" y1="5" x2="12" x1="12"></line>
                                        <line y2="12" y1="12" x2="19" x1="5"></line>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <button className="save-btn" onClick={handleSaveBtn}>
                            <span>Save</span>
                        </button>
                    </div>
                    {arr.length === 0 && (
                        <div className="info">
                            <p>Lost Track Of Tasks? <br />
                                Tasks met their Deadline? <br />
                                Well! Add Your Tasks Here</p>
                        </div>
                    )}
                </div>
                <ol>
                    {arr.map((item, index) => (
                        <div key={index} className="task">
                            <li>{item}</li>
                            <div className="btn">
                                <div className="btn-wrap">
                                    <button className="button" onClick={() => handleDelete(index)}>
                                        <svg viewBox="0 0 448 512" className="svgIcon">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="btn-wrap">
                                    <button className="update-btn" onClick={() => handleUpdate(index)}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </ol>
            </div>
        </div>
    );
}
