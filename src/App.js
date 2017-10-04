import React, { Component } from 'react'
import Howler from 'react-howler'

import './App.css'

class App extends Component {
  state = {
    playing: true
  }

  componentDidMount() {
    console.log(this.player._howler);
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

  render() {
    return (
      <div className="App">
        <h1 className='title'>ReactHowler.js</h1>
        <section>
          <h1>Simple Player</h1>
          <p className='subheading'>Only play/pause button</p>
          <div>
            <Howler
              src={['sound.ogg']}
              playing={this.state.playing}
              ref={p => this.player = p}
              onPlay={() => console.log('play!')}
              onLoadError={console.warn}
            />
            <a onClick={this.handlePlay}>Play</a>
            <a onClick={this.handlePause}>Pause</a>
          </div>
        </section>
      </div>
    )
  }
}

export default App
