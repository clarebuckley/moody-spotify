import React from 'react';
import "./Playlist.css";



class Playlist extends React.Component {

    constructor() {
        super();
        this.state = {
            results: []
        }
    }

    getSearchTerms = (text) => {
        var ignoreWords = /\b(and|or|for|the|but|i|a|it|of|,|\.|;|:|\?|!|-|'|)\b/g;
        text = text.replace(ignoreWords, '');
        text = text.replace(/\d/g, '');
        text = text.replace(/[ ,]+/g, "&");
        return text;
    }

    makePlaylist = (listData, spotifyApi) => {
        if (listData.length > 0) {
            var searchTerms = this.getSearchTerms(listData.toString());    //this will be a result of analying the terms for meaning
            console.log(searchTerms);
            spotifyApi.search(searchTerms, ['artist', 'track'], { limit: 5 })
                .then((response) => {
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
                            <img src={result.album.images[2].url} alt="album art" /> <p> {result.name} - {result.artists[0].name}</p>
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}


export default Playlist;