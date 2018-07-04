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
        var accessToken = 'BQA6ehYDwpOWdyaQLo8Ep14Ep4RUY_T2WB9MoUtrbOV7bLRgX4aCmMTmVmu5okhKYwU1-Qhu07ayWPcdkqQhXn1_x9JoGl-LC52ZQ4rXkA6hSQDABDGswSNwP__t6PkWEoJYCsXw0D0JJE1X8Pq1B5Kk_rE1Ug&refresh_token=AQCSCiO41RuRCoAmluO-PdJqWegXp00RGww8TGy8FhJ2eTPafWhUakOLQWztcQn8ghSF-k-HBzO71UefPl56BzP3wqgGzktF_RBEvQt_cm3U4GFQcix02Dp_h7fLgWign5s'
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