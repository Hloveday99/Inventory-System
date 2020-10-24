import React, { useState } from 'react';
import UpdateInvent from './UpdateInvent';

const API_URL = process.env.REACT_APP_API_URL;

const Item = ({ part, refresh }) => {
    const [open, setOpen] = useState(false);

    const deleteItem = () => {
        fetch(`${API_URL}/shop-exam/${part._id}`, {
        method: "DELETE"
    }).then(refresh)
    }
    const toggleOpen = () => setOpen(!open)
    const displayUpdate = open ?
    <fieldset>
        <UpdateInvent item={part} refresh={refresh} close={toggleOpen}/>
    </fieldset> :
    '';
    return (
        <div>
            <span>{part.name}</span>
            <button className="edit" onClick={toggleOpen}>Edit</button>
            <button className="del-btn" onClick={deleteItem}>X</button>
            {displayUpdate}
            </div>
    )
}

export default Item