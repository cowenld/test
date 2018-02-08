import React, { Component } from "react";
import { connect } from "react-redux";
import "./ItemGrid.css";

class ItemGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: "",
      audio: null,
      playing: false,
      duration: 0,
      currentTime: 0
    };
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();

      let currentTime = 0;
      let duration = 0;

      audio.addEventListener('timeupdate', (event) => {
        // console.log(this);
        currentTime = Math.floor(audio.currentTime);
        duration = Math.floor(audio.duration);
      }, false);

      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      });

    } else {
      console.log('this is the state', this.state);
      console.log(previewUrl);
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        
        this.setState({
          playing: false,
          playingUrl: '',
          currentTime: audio.currentTime
        });
        console.log(this.state);
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        });
      }
    }
  }

  renderAlbums = () => {
    return this.props.songs.map((track, i) => {
      const trackImg = track.track.album.images[0].url;

      return (
        <li
          key={i}
          className="track"
          onClick={() => this.playAudio(track.track.preview_url)}
        >
          <img
            src={trackImg}
            className="img-responsive track-image"
            alt="track"
          />
          <div className="track-info">
            <div className="track-play">
              <div className="track-play-inner">
                {this.state.playingUrl === track.track.preview_url ? (
                  <span>| |</span>
                ) : (
                  <span>&#9654;</span>
                )}
              </div>
            </div>
            <p className="track-text">
              {track.track.name} by {track.track.artists[0].name} from album{" "}
              {track.track.album.name}
            </p>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <ul className="list-unstyled track-container">
        {this.props.songs ? this.renderAlbums() : ""}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs.songs
  };
};

export default connect(mapStateToProps)(ItemGrid);
