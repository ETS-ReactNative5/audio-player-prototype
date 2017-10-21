import React, { Component } from 'react'

import AnimatedSVG from './AnimatedSVG'
import AnimatedMediaPlayer from './AnimatedMediaPlayer'
import leftBubbles from './left-bubbles.svg'
import rightBubbles from './right-bubbles.svg'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AnimatedSVG path={leftBubbles} />
        <AnimatedMediaPlayer src="https://s3.amazonaws.com/streamp3/wow/nigga-.m3u8" />
        {/* <AnimatedMediaPlayer src="https://s3.amazonaws.com/streamp3/cultive-test-.m3u8" /> */}
        <AnimatedSVG path={rightBubbles} />
      </div>
    )
  }
}

export default App
