import React, { Component } from 'react'

import AnimatedSVG from '../AnimatedSVG'
import MediaPlayer from '../MediaPlayer'

import playerBubble from './player-bubble.svg'
import './styles.css'

export default class AnimatedMediaPlayer extends Component {
  render() {
    return (
      <div className="AnimatedMediaPlayer">
        <MediaPlayer {...this.props} />
        <AnimatedSVG path={playerBubble} />
      </div>
    )
  }
}
