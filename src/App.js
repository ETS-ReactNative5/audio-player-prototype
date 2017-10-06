import React, { Component } from 'react'

import AnimatedSVG from './AnimatedSVG'
import MediaPlayer from './MediaPlayer'
import leftBubbles from './left-bubbles.svg'
import rightBubbles from './right-bubbles.svg'

import './App.css'

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <section>
          <AnimatedSVG path={leftBubbles} />
          <MediaPlayer src={['https://s3-sa-east-1.amazonaws.com/trapmp3/Episode141.mp3']} />
          <AnimatedSVG path={rightBubbles} />
        </section>
      </div>
    )
  }
}

export default App
