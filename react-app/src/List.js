import React from 'react';
import "./List.css";
class List extends React.Component {

    constructor() {
        super();
        this.state = {
            listItems: [
                "I saw a dog",
                "I slept in past 8pm"
            ]
        }
    }

    addToList = (listItem) => {

        var updatedList = this.state.listItems.push(listItem);
        this.setState({
            listItems: updatedList
        })
    }



    render() {
        return (
            <div className="list">
                <h1>What happened today?</h1>
                {this.state.listItems.map((item, index) => (
                    <p>{item}</p>
                ))}


                <input type="text" id="newItem" name="newItem" /><br /><br />
                <button>Add to list</button>

            </div>
        )
    }
}


export default List;