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
        var accessToken = 'BQAynINmoc2-JWyro1ypyiuV-6FyTLIPRiEcALl_323bMHLciGvVCtF3Sq2UbAfGQb-vKJKREESQ_YSzw2jlafA5IIDRCrxEjcZU4U4ihQoMGjDeaSo98GkZZ-p8MX7Uqpvazow6Uc1YtRH83SmAUzOfieSzAA&refresh_token=AQBwCpIp3oxRIf8_sf3ca5eZ07uFKPNY3EqdXBvJtsI7cZMpGHarfrP7nYqArAZWMp7e4aCC0KiXeefXqW85L6oa3VjVLGQXok7TEmdHW88Mj5GkDisF0YejET8ZDU-QzmQ'
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