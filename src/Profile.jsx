import React, {Component} from 'react'
import './App.css'

class Profile extends Component {
    render(){

        let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};
        artist = this.props.artist !== null ? this.props.artist : artist;
        let profilePic;
        profilePic = artist.images[0] !== undefined ? artist.images[0].url : null;
        if (profilePic !== null) {
            return (
                <div className='profile'>
                    <img
                        alt="Profile"
                        className="profile-img"
                        src={profilePic}
                    />
                    <div className='profile-info'>
                        <div className='profile-name'>{artist.name}</div>
                        <div className='profile-followers'>{artist.followers.total} followers</div>
                        <div className='profile-genres'>
                            {
                                artist.genres.map((genre, index) => {
                                    genre = genre !== artist.genres[artist.genres.length - 1]
                                        ? ` ${genre},`
                                        : `& ${genre}`;
                                    return (
                                        <span key={index}>{genre}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>No picture available</div>
            )
        }
    }
}

export default Profile