import React, { Component, } from "react";
import { Link } from 'react-router-dom'
import axios from "../../axios";
import Play from '../../components/play'
import { CSSTransition } from 'react-transition-group'

class Juz extends Component {
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
    await this.getJuz(l)
  }
  async getJuz(id) {
    const res = await axios.get('/juz/' + id)
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
          {this.state.ayat.juz ?
            <div className="flex p-4 text-white">
              <Link to='/'><i className="fas fa-angle-left"></i></Link>
              <p className=" text-xl text-center w-full">Juz {this.state.ayat.juz}</p>
            </div> : ''
          }
          <div className="bg-white p-4 mt-10 rounded-tl-[30px] rounded-tr-[30px] p-4">
            {this.state.ayat.juz ?
              <div>
                <div className="justify-center items-center flex gap-x-2 ">
                  <p>{this.state.ayat.juzStartInfo} </p>
                  <p className="text-xs text-gray-500">Sampai</p>
                  <p>{this.state.ayat.juzEndInfo}</p>
                </div>
                <p className="mb-10 text-center">{this.state.ayat.totalVerses} Ayat</p>
                <div>
                  {this.state.ayat.verses.map((e, i) => {
                    return (
                      <div className='mb-4 border-b pb-2' key={i}>
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

export default Juz
