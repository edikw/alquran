import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from '../../axiosJadwal'
import logo from '../../assets/png/no-results.png'

class Jadwal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jadwal: [],
      loading: false,
      errorKota: false,
      search: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  async searchKota(search) {
    this.setState({ loading: true })
    const res = await axios.get(`/sholat/kota/cari/${search}`)
    if (res.data.status) {
      if (Array.isArray(res.data.data)) {
        this.setState({ jadwal: [] })
        this.setState({ errorKota: false })
        res.data.data.forEach(element => {
          this.getJadwal(element.id)
        });
      } else {
        this.setState({ loading: false })
        this.setState({ errorKota: false })
      }
    } else {
      this.setState({ search: search })
      this.setState({ jadwal: [] })
      this.setState({ loading: false })
      this.setState({ errorKota: true })
    }
  }

  handleSearch(event) {
    let timeout = 0
    if (event.target.value) {
      if (event.target.value !== '' && event.target.value.length > 3) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          this.searchKota(event.target.value)
        }, 1200)
      }
    }
  }

  async getJadwal(id) {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()
    const res = await axios.get(`/sholat/jadwal/${id}/${year}/${parseInt(month) + 1}/${date}`)
    if (res.status === 200) {
      this.setState({ loading: false })
      this.state.jadwal.push(res.data.data)
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className='mb-4 p-4 flex text-primary-blue'>
            <Link to='/'><i className="fas fa-angle-left"></i></Link>
            <p className='font-bold text-lg text-center w-full'>Jadwal Sholat</p>
          </div>
          <div className='relative mb-4 px-4'>
            <input className='bg-blue-50 rounded-full w-full px-4 py-2 focus:outline-none font-thin' placeholder='Search Kota' onChange={this.handleSearch} />
            {
              this.state.loading ?
                <i className='fas fa-spinner animate animate-spin text-primary-blue absolute top-3 right-8'></i> :
                <i className='fas fa-search text-primary-blue absolute top-3 right-8'></i>
            }
          </div>
          <div>
            {
              !this.state.loading && this.state.jadwal.length ?
                <div className="p-4">
                  {this.state.jadwal.map((j, i) => {
                    return (
                      <div key={i} className="mb-4 shadow-md p-4 rounded-md">
                        <div className="mb-4">
                          <p className="text-primary-blue">{j.lokasi}</p>
                          <p className="text-sm font-thin">{j.jadwal.tanggal}</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <p className="text-gray-500">Subuh</p>
                            <p className="text-sm font-thin">{j.jadwal.subuh}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Terbit</p>
                            <p className="text-sm font-thin">{j.jadwal.terbit}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Dzuhur</p>
                            <p className="text-sm font-thin">{j.jadwal.dzuhur}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Ashar</p>
                            <p className="text-sm font-thin">{j.jadwal.ashar}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Maghrib</p>
                            <p className="text-sm font-thin">{j.jadwal.maghrib}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Isya</p>
                            <p className="text-sm font-thin">{j.jadwal.isya}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                : ''
            }
          </div>
          {
            this.state.errorKota ?
              <div className="mt-10">
                <img src={logo} alt="" className="w-20 mx-auto mb-4" />
                <p className="text-center">Pencarian <span className="font-bold">"{this.state.search}"</span> tidak ditemukan.</p>
              </div> : ''
          }
        </div>
      </div>
    )
  }
}

export default Jadwal
