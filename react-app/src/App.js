import React, { Component } from "react";
import "./App.css";
import getHashParams from "./hash.js";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();


class App extends Component {
    constructor() {
        super();
        const params = getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Not Checked', albumArt: '' }
        }
    }

    getNowPlaying() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        albumArt: response.item.album.images[0].url
                    }
                });
            })
    }

    render() {
        return (
            <div className="App">
                <a href='http://localhost:8888/login' > Login to Spotify </a>
                <a href='http://localhost:8888/logout' > Log out of Spotify </a>
                <div>
                    Now Playing: {this.state.nowPlaying.name}
                </div>
                <div>
                    <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
                </div>
                {this.state.loggedIn &&
                    <button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
        </button>
                }
            </div>
        );
    }
}

export default App;