import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class QuickAccess extends Component {
  constructor(props) {
    super()
    this.state = {
      tmp: props.surah,
      surahQu: []
    }
  }

  componentDidMount() {
    this.setState({ surahQu: this.state.tmp.slice(8, 25) })
  }

  render() {
    return (
      <div>
        <h1 className='text-xs-gray mb-2'>QUICK ACCESS</h1>
        <div className='flex gap-x-2 overflow-scroll'>
          {
            this.state.surahQu.map((e, i) => {
              return (
                <div className='flex-shrink-0 border border-primary-blue w-max px-4 py-1 rounded-full text-sm' key={i}>
                  <Link to={`/ayat/${e.number}`} className=''>{e.name.short}</Link>
                </div>

              )
            })
          }
        </div>
      </div>
    )
  }
}

export default QuickAccess
