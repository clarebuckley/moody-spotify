import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import Player from "./Player";
import "./App.css";


// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = "";


class App extends Component {
    constructor() {
        super();
        this.state = {
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
        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    }
    componentDidMount() {
        // Set token
        let _token = hash.access_token;

        if (_token) {
            // Set token
            this.setState({
                token: _token
            });
            this.getCurrentlyPlaying(_token);
        }
    }

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