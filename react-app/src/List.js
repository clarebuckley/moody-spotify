import React from 'react';
import "./List.css";
class List extends React.Component {

    constructor() {
        super();
        this.state = {
            listItems: [
                "I saw a dog",
                "I slept in past 8pm"
            ],
            newItem: ""
        }
        var errors: {
            name: false,
            email: true
        }
        const isValid = this.state.newItem.length > 0;
    }


    addToList = () => {
        var updatedItems = [...this.state.listItems, this.state.newItem];
        this.setState({
            listItems: updatedItems
        })
        this.state.newItem = "";
    }

    handleChange = (event) => {
        this.setState({
            newItem: event.target.value
        })
    }


    render() {
        return (
            <div className="list">
                <h1>What happened today?</h1>
                <div className="listContainer">
                    {this.state.listItems.map((item, index) => (
                        <li key={item.key}>{item}</li>
                    ))}
                </div>
                <input type="text" id="newItem" value={this.state.newItem} onChange={(e) => this.handleChange(e)} />
                <button disabled={!this.isEnabled} onClick={this.addToList}>Add to list</button>
            </div>
        )
    }
}


export default List;