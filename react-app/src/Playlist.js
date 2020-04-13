import React from 'react';
import "./Playlist.css";



class Playlist extends React.Component {

    constructor() {
        super();
        this.state = {
           
        }
    }

    makePlaylist = (listData) => {
        if (listData.length > 0) {
            var searchTerms = listData.toString().split(/[ ,]+/);
        }
    }

    render() {
        return (
            <div className="playlist">
                <div className="actionButton" onClick={()=> this.makePlaylist(this.props.listData)}>Make me a playlist</div>
            </div>
        )
    }
}


export default Playlist;