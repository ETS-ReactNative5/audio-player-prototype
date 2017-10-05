import React, { Component } from 'react'
import Howler from 'react-howler'

import './App.css'

class App extends Component {
  state = {
    playing: false,
    loaded: false,
  }

  handlePlay = (e) => {
    e.preventDefault()

    this.setState({
      playing: true,
    })
  }

  handlePause = (e) => {
    e.preventDefault()

    this.setState({
      playing: false,
    })
  }

  handleLoad = () => {
    this.setState({
      loaded: true
    })
  }

  loading = () => {
    return !this.state.loaded && this.state.playing
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
              src={['http://s3.amazonaws.com/americantheatrewing.org/media/downstage/mp3/Episode141.mp3']}
              html5={true}
              preload={false}
              playing={this.state.playing}
              ref={p => this.player = p}
              onLoad={this.handleLoad}
            />
            {this.loading() ? 'Loading...' : ''}
            <a onClick={this.handlePlay}>Play</a>
            <a onClick={this.handlePause}>Pause</a>
          </div>
        </section>
      </div>
    )
  }
}

export default App
