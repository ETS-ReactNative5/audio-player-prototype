import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Howler from 'react-howler'
import raf from 'raf'

class MediaPlayer extends Component {
  state = {
    playing: false,
    loaded: false,
    seek: 0,
  }

  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.string, // only one source
      PropTypes.arrayOf(PropTypes.string), // stack of sources
    ]),
    onLoad: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onLoadError: PropTypes.func,
    onEnd: PropTypes.func,
  }

  componentWillUnmount() {
    this.clearRAF()
  }

  handleToggle = (e) => {
    if (this.state.playing) {
      return this.handlePause(e)
    } else {
      return this.handlePlay(e)
    }
  }

  handlePlay = (e) => {
    e.preventDefault()

    this.setState({
      playing: true,
    }, this.renderSeekPos)
  }

  handlePause = (e) => {
    e.preventDefault()

    this.setState({
      playing: false,
    })
    this.clearRAF()
  }

  handleLoad = () => {
    this.setState({
      loaded: true,
      duration: this.player.duration(),
    })

    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  renderSeekPos = () => {
    if (this._raf) {
      this.clearRAF()
    }

    this.setState({
      seek: this.player.seek()
    })

    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  clearRAF = () => {
    raf.cancel(this._raf)
  }

  loading = () => {
    return !this.state.loaded
  }

  handleSeekChange = (e) => {
    const newSeek = parseFloat(e.target.value)

    this.player.seek(newSeek)
    this.setState({
      seek: newSeek
    })
  }

  seek = () => {
    return (
      <div className="seek">
        {this.state.seek.toFixed(2)}
      </div>
    )
  }

  playMessage = () => {
    if (this.state.playing) {
      return 'Pause'
    } else {
      return 'Play'
    }
  }

  render() {
    return (
      <div className="MediaPlayer" style={{ textAlign: 'center' }}>
        <Howler
          src={this.props.src}
          html5={true}
          playing={this.state.playing}
          ref={p => this.player = p}
          onLoad={this.handleLoad}
        />
        {
          this.state.loaded
          ? <div>
              <label>
                <span className='slider-container'>
                  <input
                    type='range'
                    min='0'
                    max={this.state.duration}
                    step='.05'
                    value={this.state.seek}
                    onChange={this.handleSeekChange}
                  />
                  {this.seek()}
                </span>
              </label>
              <a onClick={this.handleToggle}>{this.playMessage()}</a>
            </div>
          : 'Loading...'
        }
      </div>
    )
  }
}

export default MediaPlayer
