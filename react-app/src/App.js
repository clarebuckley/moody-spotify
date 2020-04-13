import React, { Component } from "react";
import "./App.css";
import getHashParams from "./hash.js";
import SpotifyWebApi from "spotify-web-api-js";
import Banner from "./Banner.js";
import List from "./List.js"
import Playlist from "./Playlist.js";

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
            userDetails: null,
            listData: []
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails = () => {
        spotifyApi.getMe()
            .then((response) => {
                this.setState({
                    userDetails: response
                })
            })
    }

    dataFromList = (data) => {
        this.setState({
            listData: data
        })
    }

    render = () => {
        if (this.state.loggedIn) {
            return (
                <div className="App">
                    <Banner loggedIn={this.state.loggedIn} userDetails={this.state.userDetails} />
                    <div className="mainContent">

                        <List callback={(data) => this.dataFromList(data)}/>
                        <Playlist listData={this.state.listData}/>

                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <Banner loggedIn={this.state.loggedIn} userDetails={this.state.userDetails} />
                    <div className="mainContent">
                        Log in with a Spotify account using the button in the top right to continue
                    </div>
                </div>
            );
        }
    }
}

export default App;