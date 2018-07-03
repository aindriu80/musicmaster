import React, { Component } from 'react';
import './App.css';


class Profile extends Component {
    render() {
        // console.log('this.props', this.props);
        let artist = { name: '', followers: { total: '' } };
        if (this.props.artist !== null) {
            artist = this.props.artist;
        }
        return (
            <div>
                <div>{artist.name}</div>
                <div>{artist.followers.total}</div>
            </div>
        )
    }
}

export default Profile;