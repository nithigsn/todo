import { useState, useEffect } from "react";


export default function ToDo({ userId, theme }) {
    const [arr, setArr] = useState([]);
    const [input, setInput] = useState("");
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://localhost:3434/bucket/items/" + userId, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setArr(result.data.items);
                } else {
                    alert(result.msg);
                }
            })
            .catch((error) => console.error(error));
    }, []);


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

        fetch("http://localhost:3434/bucket/items", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    alert(result.msg);
                } else {
                    alert(result.msg);
                }
            })
            .catch((error) => console.error(error));
    }

    function handleAdd() {
        if (input !== "" && dateTime !== "") {
            const newItem = { text: input, dateTime: dateTime };
            setArr([...arr, newItem]);
            setInput("");
            setDateTime("");
        }
    }

    function handleDelete(idx) {
        let res = arr.filter((value, index) => index !== idx);
        setArr(res);
    }

    function handleUpdate(idx) {
        let update = prompt("Update your bucket list");
        if (update !== "") {
            const newArr = [...arr];
            newArr[idx] = { ...newArr[idx], text: update };
            setArr(newArr);
        }
    }

    return (
        <div className={theme}>


            <h3>ToDo that will keep you remember</h3>



            <div className="head">
                <label htmlFor="">Add Your Task</label>
                <input className="input" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <i class="fa-solid fa-list-check"></i>
                
                <input className="date" type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
                <button onClick={handleAdd}>Add</button>
                <button>Save</button>

                <div className="info">
                  <p>  hello</p>
                </div>
            </div>
            <ol>
                {arr.map((item, index) => (

                    <div key={index} className="task">

                        <li>{item.text} <br /> {item.dateTime} </li>

                        <div className="btn">
                            <button onClick={() => handleDelete(index)}>Delete</button>
                            <button onClick={() => handleUpdate(index)}>Update</button>
                        </div>

                    </div>





                ))}



            </ol>
          

        </div>
    );
}
