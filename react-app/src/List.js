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
    }


    addToList = () => {
        if (this.state.newItem.length > 0) {
            var updatedItems = [...this.state.listItems, this.state.newItem];
            this.setState({
                listItems: updatedItems
            })
            this.state.newItem = "";
        }
    }

    removeFromList = (index) => {
        var updatedItems = [...this.state.listItems];
        if (updatedItems.length == 1) {
            updatedItems = [];
        } else {
            updatedItems.splice(index, 1);
        }  
        this.setState({
            listItems: updatedItems
        })
    }

    handleChange = (event) => {
        this.setState({
            newItem: event.target.value
        })
    }

    enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            this.addToList();
        } 
    }


    render() {
        return (
            <div className="list">
                <h1>What happened today?</h1>
                <div className="listContainer">
                    {this.state.listItems.map((item, index) => (
                        <div>
                            <button className="removeButton" onClick={() => {this.removeFromList(index)}}>x</button>
                            <li key={index}>{item}</li>
                        </div>
                    ))}
                </div>
                <input type="text" id="newItem" onKeyPress={(e) => this.enterPressed(e)} value={this.state.newItem} onChange={(e) => this.handleChange(e)} />
                <button className="addButton" onClick={this.addToList}>Add to list</button>
            </div>
        )
    }
}


export default List;