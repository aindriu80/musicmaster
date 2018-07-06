import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
// import axios from 'axios';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: "", // my query
            artist: null, // my response.
            tracks: []
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        // const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
        // Need to change/get the latest token each time with this app.
        var accessToken = 'BQDm0W6Qh-GYjHoTfrqgOvW7tyA46hh_H8i5l02rohzNE7aE61_Hq6v1oxz4hGmAsR8_EEZVJm-Pa7el0IJgrVhLRlXxW-miM-WjbQ97_r22HVRPL9uAlOz7hE3QYVOHWu8PO6uhP1p8XHFtCWvMjoTEcbRg5w&refresh_token=AQAKLab0jWC35QZ9uyzm89_TTawlRxp2WtdQ_uOQIPYtEB2v9yPRC__qSyIjhKVoJrqxKTYDL_NYGNipKF2JEwZqDWHWYXsod5B_vdf-XBgDzeZoO8hTeYpMmWmZvji2FGI'
        console.log('FETCH_URL', FETCH_URL);

        var myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, myOptions)
            .then(response => response.json())

            .then(json => {
                const artist = json.artists.items[0];
                this.setState({ artist });

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
                fetch(FETCH_URL, myOptions, {
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then(json => {
                        console.log('artist\'s top tracks:', json);
                        // const tracks = json.tracks;
                        const { tracks } = json;
                        this.setState({ tracks });
                    })
            });

    }

    render() {

        let artist = {
            name: '',
            followers: {
                total: ''
            }
        };
        if (this.state.artist !== null) {
            artist = this.state.artist;
        }

        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                        ?
                        <div>
                            <Profile
                                artist={this.state.artist}
                            />
                            <Gallery
                                tracks={this.state.tracks}
                            />

                        </div>
                        : <div></div>
                }

            </div>
        )
    }
}

export default App;