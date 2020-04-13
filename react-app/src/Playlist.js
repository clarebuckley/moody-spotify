import React from 'react';
import "./Playlist.css";



class Playlist extends React.Component {

    constructor() {
        super();
        this.state = {
            results: []
        }
    }

    makePlaylist = (listData, spotifyApi) => {
        if (listData.length > 0) {
            var searchTerms = listData.toString().replace(/[ ,]+/, "&20");    //this will be a result of analying the terms for meaning
            spotifyApi.search(searchTerms, ['artist', 'track'], { limit: 5})
                .then((response) => {
                    console.log(response.tracks.items[0].album.images[0].url);
                    this.setState({
                        results: response.tracks.items
                    })
                })
        }
    }

    render() {
        return (
            <div className="playlist">
                <div className="actionButton" onClick={() => this.makePlaylist(this.props.listData, this.props.spotifyApi)}>Make me a playlist</div>
                <div className="resultsContainer">
                    {this.state.results.map((result, index) => (
                        <li className="result">
                            <img src={result.album.images[2].url} alt="album art" />
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}


export default Playlist;