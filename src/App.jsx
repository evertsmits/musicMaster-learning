import React, { Component } from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search(){
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&market=NL&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        var accessToken = 'BQArewdXRrsKW3YRJNBGlPYJSvdvh5Dqd1bVdEWPlL1Nn27E7CvtTmLt-32Jy5mQ9pGOFISHXDnzjiJ7lbMMm4gczcOGI93A_jXDt0n_91ZNF-d1E2SupnLbCw8qA2Z-lOCaFNRFLrPkrz_saMro7a_D3RWFaKqFZceI';

        var myOptions = {
            method: 'GET',
            headers:  {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, myOptions )
            .then(response => response.json())
            .then(json => {
                console.log('found artists', json.artists);
                if(json.artists !== undefined){
                    const artist = json.artists.items[0];
                    this.setState({artist});

                    FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=NL&`;
                    fetch(FETCH_URL, myOptions)
                        .then(response => response.json())
                        .then(json => {
                            console.log('artist\'s top tracks', json);
                            const tracks = json.tracks; //also const { tracks } = json
                            this.setState({tracks});
                        })
                } else {
                    this.setState({artist: null})
                }
            })
    }

    render(){
        return(
            <div className="App">
                <div className="App-title">
                    Music master
                </div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search an artist..."
                            value={this.state.query}
                            onKeyPress={event => {event.key === 'Enter' ? this.search() : null}}
                            onChange={event => {this.setState({query: event.target.value})}}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null ?
                        <div>
                            <Profile artist={this.state.artist} />
                            <Gallery tracks={this.state.tracks} />
                        </div>
                    :
                        <div>No artist found</div>

                }
            </div>
        )
    }
}

export default App;