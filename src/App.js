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
            artist: null  // my response.
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        // const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

        // Need to change/get the latest token each time with this app.
        var accessToken = 'BQCmT0qKJ41ibCqVUsnqTjenCdaQrxdMb-W_2k-6efMcwfsyKllUWz7bhdSSVMkkS4ne4gBC0CNiDsB2R9GD3NFTTnLz07a_Q-dRa1_8BN6bmrFH-Q59fGKLfUoGCXHC5K1viBF_YFGBBusH5oQujg4_qcNx_A&refresh_token=AQBHT1CJkykjB7spNrvjLSNQdO1oSC1er4uhm2-1p261ehnKzqXjAhy3AOyGgnI4fP781fUqSrUQpHOGVsMxHymOJkfDyHPr1OEERiS8cInt6svGpvfvMhDlCs7-YIjVpdk'
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
            })

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
                <Profile
                    artist={this.state.artist}
                />
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default App;