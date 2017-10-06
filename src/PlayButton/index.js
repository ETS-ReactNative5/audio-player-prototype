import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactSVG from 'react-svg'

import visualFeedback from './visual-feedback.svg'
import './styles.css'

export default class PlayButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return (
      <div className={`PlayButton ${this.props.className}`} onClick={this.props.onClick}>
        <div className="visual">
          <ReactSVG className="visual" path={visualFeedback} />
        </div>
      </div>
    )
  }
}
