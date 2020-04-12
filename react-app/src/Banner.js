import React from 'react';

class Banner extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="Banner">
                {
                    this.props.userDetails ? <div> Hello {this.props.userDetails.display_name}!</div> : <div> Waiting... </div>
                }  
            {
                this.props.loggedIn &&
                    <a href='http://localhost:8888/logout' > Log out of Spotify </a>
            }
            {
                !this.props.loggedIn &&
                    <a href='http://localhost:8888/login' > Login to Spotify </a>
                }  
            </div>
        )
    }

}


export default Banner;