import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
// import axios from 'axios';
import Profile from './Profile';

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
        var accessToken = 'BQCen-dICNO8JFCRUOWUesFnO7EippJaPHwYyYkriT_18KG8YIFrbemma7yknhN8BqZKSLqzfwfT1h-RmDgfFKscdfT0dJNJNZGB2Ohj63QnPTuLE-Lfb9v17qw4VDdtgPrgf-bPQf3xeBU8HgD3q0gjHFitGA&refresh_token=AQCxxznQEAc-OlmaS3d0nMQWxoVR_51NNtydvlC_dBtyg73f9UbVg1HuLFxRoIEYZdE3VobYPdDgL1sTxuh9Xwn-1XoVMbtbJsHBhkC_ySE9jIk-5yGoHor9OfopcOKP2Go'
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
                            <div className="Gallery">
                                Gallery
                        </div>

                        </div>
                        : <div></div>
                }

            </div>
        )
    }
}

export default App;