import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactSVG from 'react-svg'
import Anime from 'animejs'

export default class AnimatedSVG extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  componentWillUnmount() {
    clearTimeout(this._timeout)
  }

  animate = (svg) => {
    console.log(svg);

    const paths = Array.from(svg.querySelectorAll('path'))

    paths.forEach(path => {
      this._timeout = setTimeout(() => {
        Anime({
          loop: true,
          targets: path,
          direction: 'alternate',
          easing: [.5, 0, .5, 1],
          duration: Anime.random(3000, 5000),
          d: path.getAttribute('pathdata:id'),
        })
      }, Anime.random(0, 1000))
    })
  }

  render() {
    return <ReactSVG path={this.props.path} callback={this.animate} />
  }
}
