import React, { Component } from "react";
import "./App.css";
import getHashParams from "./hash.js";
import SpotifyWebApi from "spotify-web-api-js";
import Banner from "./Banner.js";

const spotifyApi = new SpotifyWebApi();


class App extends Component {
    constructor(props) {
        super(props);
        const params = getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Not Checked', albumArt: '' },
            userDetails: null
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails = () => {
        spotifyApi.getMe()
            .then((response) => {
                {
                    this.setState({
                        userDetails: response
                    })
                    console.log(this.state);
                }
            })
    }

    getNowPlaying = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                if (!response) {
                    this.setState({
                        nowPlaying: {
                            name: 'Not currently listening to anything',
                            albumArt: ''
                        }
                    })
                } else {
                    this.setState({
                        nowPlaying: {
                            name: response.item.name,
                            albumArt: response.item.album.images[0].url
                        }
                    });
                }
            })
    }

    render = () => {
        return (

            <div className="App">

                <Banner loggedIn={this.state.loggedIn} userDetails={this.state.userDetails} />
            
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