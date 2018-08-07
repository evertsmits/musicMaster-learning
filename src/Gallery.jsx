import React, { Component } from 'react'
import './App.css'

class Gallery extends Component{
    constructor(props){
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }

    pause(){
        this.state.audio.pause();
        this.setState({
            playing: false
        })
    }

    play(audio, url){
        audio.play();
        this.setState({
            playing: true,
            playingUrl: url,
            audio
        })
    }

    pauseAndPlay(audio, url){
        this.state.audio.pause();
        audio.play();
        this.setState({
            playing: true,
            playingUrl: url,
            audio
        })
    }

    selectAudio(previewUrl){
        let audio = new Audio(previewUrl);
        if (!this.state.playing){
            this.play(audio, previewUrl)
        } else {
            if (previewUrl === this.state.playingUrl) {
                this.pause()
            } else {
                this.pauseAndPlay(audio, previewUrl)
            }
        }
    }

    render(){
        const { tracks } = this.props; //can also be const tracks = this.props.tracks

        return(
            <div>
                {tracks.map((track, k) => {
                    let trackImg
                    if (track.album.images[0].url !== undefined) {
                        trackImg = track.album.images[0].url;
                    } else {
                        trackImg = null;
                    }
                    return(
                    <div
                        key={k}
                        className='track'
                        onClick={() => this.selectAudio(track.preview_url)}
                    >
                        <img
                            src={trackImg}
                            className="track-img"
                            alt="track-img"
                        />
                        <div className="track-play">
                            <div className="track-play-inner">
                                {
                                    this.state.playingUrl === track.preview_url && this.state.playing
                                    ? <span>||</span>
                                    : <span>&#9654;</span>
                                }
                            </div>
                        </div>
                        <p className="track-text">
                            {track.name}
                        </p>
                    </div>)
                })}
            </div>
        )

    }
}

export default Gallery;