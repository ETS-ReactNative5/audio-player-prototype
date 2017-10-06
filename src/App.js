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
        <AnimatedMediaPlayer src={['http://d1qku3w3cvcbac.cloudfront.net/Episode141.mp3']} />
        <AnimatedSVG path={rightBubbles} />
      </div>
    )
  }
}

export default App
