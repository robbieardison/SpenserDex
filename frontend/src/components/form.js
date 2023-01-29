import React, { useState } from "react";
import axios from 'axios';
// import { ShowBoxes } from "./showBoxes";

export function Form() {
    const [data, setData] = useState({
        
    });
    const [showBoxes, setShowBoxes] = useState(false);
    const [formInputs, setFormInputs] = useState({
        amount: 0,
        category: '',
        description: ''
      });

    const submit = (e) => {
        //This commented out section consists of my beginner mistakes
        // e.preventDefault();
        // axios.post('http://localhost:8000/boxes', {
        //     amount: parseInt(data.amount),
        //     category: data.category,
        //     description: data.description
        // }).then(res => console.log(res.data)).catch(err => console.log(err))
        e.preventDefault();
        axios.post('http://localhost:8000/boxes', {
            amount: parseInt(formInputs.amount),
            category: formInputs.category,
            description: formInputs.description
        }).then(res => console.log(res.data))
        .catch(err => console.log(err));
    };

    const handle = (e) => {
        //This too
        // const newData = { ...data };
        // newData[e.target.name] = e.target.value;
        // setData(newData);
        // console.log(newData);
        formInputs[e.target.name] = e.target.value;
        setFormInputs(formInputs);
        console.log(formInputs);
    };

    const handleDelete = async (id, e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:8000/boxes/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        getBoxes();
        setData(data.filter(each => each.id !== id));
        console.log(data);
        // await axios.delete(`http://localhost:8000/boxes/${id}`)
        //     .then(res => console.log(res))
        //     .then(() => axios('http://localhost:8000/boxes')
        //         .then((res) => setData(res.data))
        //         .catch(err => console.log('error atas')))
        //     .catch(err => console.log('there is an error!'));
        // setData(data.filter(each => each.id !== id));
        // console.log(data);
    }
    

    const getBoxes = async () => {
        // const response = await axios.get('http://localhost:8000/boxes');
        // console.log(response.data);
        // setData(response.data);
        // setShowBoxes(true);
        const response = await axios.get('http://localhost:8000/boxes');
        console.log(response.data);
        setData(response.data);
        setShowBoxes(true);
    }

    /*useEffect(() => {
        fetch('http://localhost:8000/boxes')
            .then((res) => res.json())
            .then(data => setData(data)) 
    }, []);*/

    return (
        <div>
            <div>
                <form onSubmit={e => submit(e)} className='Form'>
                    <label>Amount:</label>
                    <input 
                    onChange={e => handle(e)} 
                    name='amount' type='number' value={data.amount} />
                    <br />
                    <label>Category:</label>
                    <select 
                    onChange={e => handle(e)} 
                    name='category' value={data.category}>
                        <option>Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                    </select>
                    <br />
                    <label>Description:</label>
                    <input 
                    onChange={e => handle(e)} 
                    name='description' type='text' value={data.description} />
                    <br />
                    <button type='submit' style={{ borderRadius:'3px', color: 'white', backgroundColor: '#007ACC' }}>submit</button>
                </form>
                <div style={{margin: '10px', display: 'inline-block', fontWeight:'bolder'}} ><button onClick={() => getBoxes()}>show Boxes</button></div>                           
            </div>
            {showBoxes && data.map(each => (
            <div style={{ display: 'inline-grid' }}>
                <div key={each.id}
                    style={{
                        borderStyle: 'solid',
                        borderRadius: '10px',
                        width: '200px',
                        wordWrap: 'break-word',
                        padding: '10px',
                        margin: '10px',
                        backgroundColor: '#007ACC',
                    }}>
                    <button onClick={(e) => handleDelete(each.id, e)}>x</button>
                    <p key={each.amount}>Amount: {each.amount}</p>
                    <p key={each.description}>Description: {each.description}</p>
                    <p key={each.category}>Category: {each.category}</p>
                </div>
            </div>
        ))}
        </div>
    )
}