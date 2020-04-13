import React, { Component } from 'react';
import "./Playlist.css";



class Playlist extends React.Component {

    constructor() {
        super();
        this.state = {
           
        }
    }

    render() {
        return (
            <div className="playlist">
               <div className="actionButton">Make me a playlist</div>
            </div>
        )
    }
}


export default Playlist;