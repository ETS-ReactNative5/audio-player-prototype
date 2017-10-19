import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hls from 'hls.js'
import raf from 'raf'

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
    currentTime: 0,
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

    this.hls.on(Hls.Events.ERROR, this.handleError)
  }

  componentWillUnmount() {
    this.hls && this.hls.destroy()
  }

  watchSeek = () => {
    // cancel the recursion if we can't or don't need to update currentTime
    if (!this.video || !this.state.playing) return

    const {currentTime} = this.video

    this.setState({currentTime})

    raf(this.watchSeek)
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
    raf(this.watchSeek)
  }

  handleError = (event, data) => {
    const { hls } = this
    const { type, details } = data

    switch(type) {
      case hls.ErrorTypes.NETWORK_ERROR:
        console.error(`Network error: ${details}`)
        hls.startLoad()
        break

      case hls.ErrorTypes.MEDIA_ERROR:
        console.error(`Media error: ${details}`)
        if (this.recoveringMediaError) {
          hls.swapAudioCodec() // work around audio codec mismatch
        }

        this.recoveringMediaError = true
        setTimeout(() => delete this.recoveringMediaError, 500)
        hls.recoverMediaError()
        break

      case hls.ErrorTypes.OTHER_ERROR:
      default:
        console.error(`Unknown error: ${details}`)
        console.error('Fatal error! Cannot recover :\'(')
        hls.destroy()
        break
    }
  }

  render() {
    if (Hls.isSupported()) {
      return (
        <div className="MediaPlayer">
          <video ref={v => this.video = v} />
          <div className="buttons">
            <PlayButton
              playing={this.state.playing}
              onClick={this.togglePlay}
            />
          </div>
          {this.state.currentTime.toFixed(2)}
        </div>
      )
    } else {
      console.warn("Platform doesn't support HLS!")
      return null
    }
  }
}

export default MediaPlayer
