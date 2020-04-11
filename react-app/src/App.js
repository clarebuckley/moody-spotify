import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import Player from "./Player";
import hash from "./hash";
import "./App.css";
import { getCurrentlyPlaying } from "./SpotifyAPI"

const emptyState = {
    token: null,
    item: {
        album: {
            images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
    },
    is_playing: "Paused",
    progress_ms: 0
};

class App extends Component {
    constructor() {
        super();
        //To hold data from the api call
        this.state = emptyState;
        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    }
    //executed immediately our component is mounted 
    componentDidMount() {
        let _token = hash.access_token;
        if (_token) {
            // Set token
            this.setState({
                token: _token
            });
            this.getCurrentlyPlaying(_token);
        }
    }

    //TODO: move requests to SpotifyAPI
    getCurrentlyPlaying(token) {
        // Make a call using the token
        $.ajax({
            url: "https://api.spotify.com/v1/me/player",
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                this.setState({
                    item: data.item,
                    is_playing: data.is_playing,
                    progress_ms: data.progress_ms
                });
            },
            error: error => {
                console.log(error);
            }
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {!this.state.token && (
                        <a
                            className="btn btn--loginApp-link"
                            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                                "%20"
                            )}&response_type=token&show_dialog=true`}
                        >
                            Login to Spotify
            </a>
                    )}
                    {this.state.token && (
                        <Player
                            item={this.state.item}
                            is_playing={this.state.is_playing}
                            progress_ms={this.progress_ms}
                        />
                    )}
                </header>
            </div>
        );
    }
}

export default App;