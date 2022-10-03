import React, { Component, } from "react";
import { Link } from 'react-router-dom'
import axios from "../../axios";
import Play from '../../components/play'
import { CSSTransition } from 'react-transition-group'

class Ayat extends Component {
  constructor() {
    super()
    this.state = {
      ayat: [],
      show: false,
      play: '',
      loading: false,
      nodeRef: React.createRef(null)

    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal = (e) => {
    this.setState({ show: true })
    this.setState({ play: e })
  }

  hideModal = () => {
    this.setState({ show: false })
    this.setState({ play: '' })
  }

  async componentDidMount() {
    const l = window.location.pathname.split('/')[2]
    await this.getAyat(l)
  }
  async getAyat(id) {
    const res = await axios.get('/surah/' + id)
    if (res.data.code === 200) {
      this.setState({ loading: true })
      this.setState({ ayat: res.data.data })
    }
  }
  render() {
    return (
      <CSSTransition in={this.state.loading} unmountOnExit timeout={300} nodeRef={this.state.nodeRef} classNames="fade"

      >
        <div className="bg-primary-blue">
          {this.state.ayat.name ?
            <div className="flex p-4 text-white">
              <Link to='/'><i className="fas fa-angle-left"></i></Link>
              <p className=" text-xl text-center w-full">{this.state.ayat.name.transliteration.id}</p>
            </div> : ''
          }
          <div className="bg-white p-4 mt-10 rounded-tl-[30px] rounded-tr-[30px] p-4">
            {this.state.ayat.name ?
              <div>
                <div className="text-center mb-10">
                  <p>{this.state.ayat.name.short}</p>
                  <p>{this.state.ayat.name.translation.id}</p>
                  <p className="text-xs text-gray-500">{this.state.ayat.revelation.id}</p>
                  <p className="text-xs text-gray-500">{this.state.ayat.numberOfVerses} Ayat</p>
                </div>
                <div className="mb-6">
                  {this.state.ayat.name.transliteration.id === 'Al-Fatihah' ?
                    <div className="text-center">
                      <p className="text-xl">{this.state.ayat.verses[0].text.arab}</p>
                    </div> :
                    <div className="text-center">
                      <p className="text-xl">{this.state.ayat.preBismillah.text.arab}</p>
                    </div>
                  }
                </div>
                <div>
                  {this.state.ayat.verses.map((e, i) => {
                    return (
                      <div className={this.state.ayat.name.transliteration.id === 'Al-Fatihah' && i === 0 ? 'hidden' : 'mb-4 border-b pb-2'} key={i}>
                        <div className="text-right">
                          <div className="">
                            <p>{e.text.arab} .<span className="text-sm">{i + 1}</span></p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">{e.translation.id}</p>
                            <p className="text-xs text-gray-500 cursor-pointer" onClick={() => this.showModal(e.audio.secondary[0])}><i className="fas fa-play-circle text-primary-blue"></i> Play</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div> : ''
            }
          </div>
          <Play handleClose={this.hideModal} show={this.state.show} data={this.state.play} />

        </div>
      </CSSTransition>
    )
  }
}

export default Ayat
