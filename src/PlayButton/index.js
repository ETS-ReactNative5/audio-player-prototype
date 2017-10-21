import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactSVG from 'react-svg'

import visualFeedback from './visual-feedback.svg'
import seekBar from './seek-bar.svg'
import './styles.css'

export default class PlayButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  componentDidUpdate(prevProps) {
    if (!this.seek) return

    const border = this.seek.querySelector('.border')
    const fullSize = parseFloat(border.getAttribute('stroke-dasharray'))

    border.setAttribute('stroke-dashoffset', fullSize * (1 - this.props.seek))
  }

  playing = () => {
    return this.props.playing ? '-playing' : ''
  }

  render() {
    return (
      <div className={`PlayButton ${this.playing()}`} onClick={this.props.onClick}>
        <ReactSVG className="seek-bar" path={seekBar} callback={svg => this.seek = svg} />
        <div className="visual">
          <ReactSVG className="visual" path={visualFeedback} />
        </div>
      </div>
    )
  }
}
