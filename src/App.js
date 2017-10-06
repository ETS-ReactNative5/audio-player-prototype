import React, { Component } from 'react'
import ReactSVG from 'react-svg'

import MediaPlayer from './MediaPlayer'
import leftBubbles from './left-bubbles.svg'
import rightBubbles from './right-bubbles.svg'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <ReactSVG path={leftBubbles} />
          <MediaPlayer src={['https://s3-sa-east-1.amazonaws.com/trapmp3/Episode141.mp3']} />
          <ReactSVG path={rightBubbles} />
        </section>
      </div>
    )
  }
}

export default App
