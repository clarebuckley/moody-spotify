import React from 'react';
import "./Banner.css";
class Banner extends React.Component {
    
    render() {
        return (
            <div className="banner">
                <div className="header">
                     Playlist for the Day-List
                </div>
                <nav>
                    {
                        this.props.userDetails ?
                            <div className="instruction"> Hi {this.props.userDetails.display_name.split(' ')[0]}! Let's make you a playlist</div> :
                            <div className="instruction">Log in with Spotify to continue</div>
                    }
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