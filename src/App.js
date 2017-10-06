import React, { Component } from 'react'
import MediaPlayer from './MediaPlayer'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className='title'>React Simple Media Player</h1>
        <section>
          <h1>With remote files</h1>
          <MediaPlayer src={['https://s3-sa-east-1.amazonaws.com/trapmp3/Episode141.mp3']} />
        </section>
        <section>
          <h1>With local files</h1>
          <MediaPlayer src={['trap.webm', 'trap.mp3']} />
        </section>
      </div>
    )
  }
}

export default App
