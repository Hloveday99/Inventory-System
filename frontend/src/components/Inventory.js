import React, { Component } from 'react'
import CreateItem from './CreateItem';
import Item from './Item';

const API_URL = process.env.REACT_APP_API_URL;

export default class extends Component {
    state = {
        inventory: []
    }
    getInventory = () => {
        fetch(`${API_URL}/shop-exam`)
            .then(response => response.json())
            .then(inventory => this.setState({inventory}))
    }
    componentDidMount(){
        this.getInventory()
    }
    render() {
        const displayInventory = this.state.inventory.map (part => 
             <Item key={part._id}
             part={part}
             refresh={this.getInventory}
             />
             )

        return (
            <div>
                <h1>Inventory system</h1>
                <CreateItem refresh={this.getInventory}/>
                {displayInventory}
                </div>
        )
    }
}