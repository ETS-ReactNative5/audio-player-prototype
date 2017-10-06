import React, { Component } from 'react'
import Howler from 'react-howler'
import raf from 'raf'

import './App.css'

class App extends Component {
  state = {
    playing: false,
    loaded: false,
    seek: 0,
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
    })
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
        {this.state.seek !== undefined ? this.state.seek.toFixed(2) : '0.00'}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h1 className='title'>ReactHowler.js</h1>
        <section>
          <h1>Simple Player</h1>
          <p className='subheading'>Only play/pause button</p>
          <div>
            <Howler
              src={['https://s3-sa-east-1.amazonaws.com/trapmp3/Episode141.mp3']}
              html5={true}
              playing={this.state.playing}
              ref={p => this.player = p}
              onLoad={this.handleLoad}
            />
            {this.loading() ? 'Loading...' : ''}
            {
              this.state.loaded && (
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
              )
            }
            <a onClick={this.handlePlay}>Play</a>
            <a onClick={this.handlePause}>Pause</a>
          </div>
        </section>
      </div>
    )
  }
}

export default App
