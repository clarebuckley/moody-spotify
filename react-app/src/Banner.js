import React from 'react';
import "./Banner.css";
import $ from "jquery";

class Banner extends React.Component {
    

    render() {
        return (
            <div className="banner">
                <div className="header">
                    {
                        this.props.userDetails ?
                            <p> Hi {this.props.userDetails.display_name.split(' ')[0]}! How was your day today?</p> :
                            <p>Log in with Spotify to continue</p>
                    }
                </div>
                <nav>
                    {
                        this.props.loggedIn &&
                        <a href='http://localhost:8888/logout' > Log out of Spotify </a>
                    }
                    {
                        !this.props.loggedIn &&
                        <a href='http://localhost:8888/login' > Login with Spotify </a>
                    }
                </nav>
            </div>

        )
    }

}


export default Banner;