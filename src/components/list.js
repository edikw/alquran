import React, { Component } from "react";
import { Link } from "react-router-dom";

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'surah',
      surah: props.surah,
      juz: props.juz,
      count: 1
    }
  }
  render() {
    return (
      <div >
        <div className="grid grid-cols-2 gap-2 px-4">
          <div className={`text-center pb-1 ${this.state.active === 'surah' ? 'border-b-2 border-primary-blue font-bold' : ''}`} onClick={() => this.setState({ active: 'surah' })}>
            <p className="text-xs-gray">SURAH</p>
          </div>
          <div className={`text-center pb-1 ${this.state.active === 'juz' ? 'border-b-2 border-primary-blue font-bold' : ''}`} onClick={() => this.setState({ active: 'juz' })}>
            <p className="text-xs-gray">JUZ</p>
          </div>
        </div>
        {
          this.state.active === 'surah' ?
            (<div className="bg-primary-light p-4 rounded">
              <div>
                {this.state.surah.map((e, i) => {
                  return (
                    <Link to={`/ayat/${e.number}`} className="flex justify-between mb-2 border-b pb-1 items-center" key={i}>
                      <div className="flex gap-x-2">
                        <div>
                          <p className="text-sm">{i + 1}.</p>
                        </div>
                        <div>
                          <p className="font-bold">
                            {e.name.transliteration.id}
                          </p>
                          <p className="text-xs-gray mb-1">{e.name.translation.id}</p>
                          <p className="text-xs-gray">{e.revelation.id}</p>
                        </div>
                      </div>
                      <p className="text-xl">
                        {e.name.short}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>) :
            (
              <div className="bg-primary-light p-4 rounded">
                <div>
                  {this.state.juz.map((e, i) => {
                    return (
                      <Link to={`/juz/${e.juz}`} className=" flex gap-x-2 mb-2 border-b pb-1" key={i}>
                        <p className="text-sm">{i + 1}.</p>
                        <div>
                          <p className="font-bold">Juz {e.juz}</p>
                          <p className="text-xs-gray">Mulai dari : {e.juzStartInfo}</p>
                          <p className="text-xs-gray">Sampai di : {e.juzEndInfo}</p>

                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
        }
      </div >
    )
  }
}

export default List
