import React, {useState, useEffect} from 'react'
import '../Components/Styles.css'
import mainImage from '../Images/todo.svg.svg'

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [item, setItem] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () => {
        if(!inputData){
            alert("🚨🚨 Please Fill The Data")
        } 
        else if(inputData && toggleButton){
            setItem(
                item.map((currElem) => {
                    if(currElem.id === isEditItem){
                        return {...currElem, name: inputData};
                    }
                    return currElem;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name: inputData,
            }
            setItem([...item,myNewInputData]);
            setInputData("");
        }
    }

    const editItem = (index) => {
        const itemEdited = item.find((currElem) => {
            return currElem.id === index;
        })
        setInputData(itemEdited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    const deleteItem = (index) =>{
        const updatedItem = item.filter((currElem)=>{
            return currElem.id !== index;
        });
        setItem(updatedItem);
    }

    const removeAll = () => {
        setItem([]);
    }

    useEffect(() => {
       localStorage.setItem("mytodolist", JSON.stringify(item));
    }, [item])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={mainImage} alt="todo"/>
                        <figcaption> Add Your List Here ✌ </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type='text' 
                            placeholder='✍ Add Item' 
                            className='form-control'
                            value={inputData}
                            onChange= {(event) => setInputData(event.target.value)}
                        />
                        {toggleButton ? (
                            <i className='fas fa-edit add-btn' onClick={addItem}></i>                           
                        ):(
                            <i className='fa fa-plus add-btn' onClick={addItem}></i>
                        )}
                        
                    </div>

                    <div className="showItems">
                        {item.map((currElem) => {
                            return (
                                <div className="eachItem" key={currElem.id}>
                                <h3>{currElem.name}</h3>
                                <div className="todo-button">
                                    <i className='fas fa-edit add-btn' onClick={() => editItem(currElem.id)}></i>
                                    <i className='fas fa-trash-alt add-btn' onClick={() => deleteItem(currElem.id)}></i>
                                </div>
                                </div>
                            );
                        })}
                        
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
