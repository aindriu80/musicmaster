import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
// import axios from 'axios';

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

        var accessToken = 'BQA5Q-SAJvUmiuxaqC2kh3ftzMBew7SRnw_DTPlzo1c6WI65fhCxI_d07hILUp1ZeUW7xIb_knT10AD6Fu-7Wk30Ydhs1UJjzU6zUHh_UnIq9XuZoClJA8JXbbG2xJxr67gAS5KT-tOLb4_utCOLNgJi__9B_A&refresh_token=AQC1RadQ1oinrW91TCotd6Oaz6CT1c7E46XtNIs8FI97oE-gn0SKe7Dhecgti_sBY5NsDmeYNxfJqNBrsJ0WvxqXLoaLYu1IYxeNDZ8hPfqHo3RSsE_yELStmhLhZEA1LL4'

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
                <div className="Profile">
                    <div>Artist Picture</div>

                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default App;