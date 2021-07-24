import React from 'react'
import '../Components/Styles.css'

const Todo = () => {
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src='./Images/todo.svg' alt="todo"/>
                        <figcaption> Add Your List Here ✌ </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type='text' placeholder='✍ Add Item' className='form-control'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
