import React, { useEffect, useState } from 'react'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import './Todo.css'

const getLocalItems = () => {
    let list = localStorage.getItem('lists');

    if(list){
        return JSON.parse(localStorage.getItem('lists'))
    }
    else {
        return [];
    }
}

function Todo() {

    const [inputData, setInputData] = useState('');
    const [items , setItems] = useState(getLocalItems());

    console.log(items);

    const addItem = () => {
        if(inputData){
            setItems([inputData , ...items]);
            setInputData('');
        }
    }

    const task__complete = (elem , key) => {
        const updateitems = items.filter((elem , ind) => {
            return ind !== key;
        })

        setItems(updateitems);
        setItems([...updateitems , elem]);
    }

    const clearItem = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('lists' , JSON.stringify(items));
    } , [items])

  return (
        <div className='container'>
            <div className='clear__all'>
                    <button className = "btn2" onClick={clearItem}> Clear List</button>
            </div>

            <div className='main__div'>
                <div className='left'>
                    <p className='heading'>Your Todo App</p>
                    <p className='sub__heading'>This App is used to maintain our day-to-day tasks or list everything that we have to do,
                        with the most recent tasks at the top of the list. It is helpful in planning our daily schedules.
                        We can add more tasks at any time and delete a task that is completed.
                        It is a regular offline app.
                        Hitting the refresh button not cause any changes.</p>
                    <div className='addItem'>
                        <input 
                            type = "text" 
                            placeholder='New Task...' 
                            value = {inputData}
                            onChange = {(e) => setInputData(e.target.value)} 
                        />
                        <button onClick={addItem}> Add Task To List</button>
                        
                    </div>

                </div>
                <div className='right'>
                    <div className='showItem' >
                        {
                            items &&
                            items.map((elem , ind) => {
                                return (
                                    <div className='eachItem' key = {ind}>
                                        <div className='wrap'>
                                            <div className='content'> {elem} </div>
                                            <div className='delete__icon'>
                                                <CheckCircleRoundedIcon  onClick = {() => task__complete(elem , ind)}/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Todo