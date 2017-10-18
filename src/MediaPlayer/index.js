import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hls from 'hls.js'

import PlayButton from '../PlayButton'

import './styles.css'

class MediaPlayer extends Component {
  static propTypes = {
    src: PropTypes.string,
    onLoad: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onLoadError: PropTypes.func,
    onEnd: PropTypes.func,
  }

  state = {
    playing: false,
  }

  componentDidMount() {
    this.hls = new Hls()
    this.hls.attachMedia(this.video)

    this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      this.hls.loadSource(this.props.src)
    })

    this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.log(`manifest loaded, found ${data.levels.length} quality level`)
    })

    this.hls.on(Hls.Events.ERROR, (event, data) => {
      const { type, details } = data

      switch(type) {
        case this.hls.ErrorTypes.NETWORK_ERROR:
          console.error(`Network error: ${details}`)
          this.hls.startLoad()
          break

        case this.hls.ErrorTypes.MEDIA_ERROR:
          console.error(`Media error: ${details}`)
          if (this.recoveringMediaError) {
            this.hls.swapAudioCodec() // work around audio codec mismatch
          }

          this.recoveringMediaError = true
          setTimeout(() => delete this.recoveringMediaError, 500)
          this.hls.recoverMediaError()
          break

        case this.hls.ErrorTypes.OTHER_ERROR:
        default:
          console.error(`Unknown error: ${details}`)
          console.error('Cannot recover')
          this.hls.destroy()
          break
      }
    })
  }

  componentWillUnmount() {
    this.hls && this.hls.destroy()
  }

  togglePlay = () => {
    if (this.state.playing) {
      this.pause()
    } else {
      this.play()
    }
  }

  pause = () => {
    this.setState({playing: false})
    this.video.pause()
  }

  play = () => {
    this.setState({playing: true})
    this.video.play()
  }

  render() {
    if (Hls.isSupported()) {
      console.log('loading HLS...')

      return (
        <div className="MediaPlayer">
          <video ref={v => this.video = v} />
          <div className="buttons">
            <PlayButton
              playing={this.state.playing}
              onClick={this.togglePlay}
            />
          </div>
        </div>
      )
    } else {
      console.warn("Browser doesn't support HLS!")

      return null
    }
  }
}

export default MediaPlayer
