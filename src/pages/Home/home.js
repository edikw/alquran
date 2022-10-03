import React, { Component } from 'react';
import Menu from '../../components/menu'
import QuickAccess from '../../components/quick-acces';
import axios from '../../axios'
import List from '../../components/list';


class Home extends Component {
  constructor() {
    super()
    this.state = {
      surah: [],
      juz: []
    }
  }

  componentDidMount() {
    Promise.all([this.getSurah(), this.getJuz()])
  }

  async getSurah() {
    const res = await axios.get('/surah')
    this.setState({ surah: res.data.data })
  }

  async getJuz() {
    const tmp = []
    for (let i = 1; i < 31; i++) {
      this.setState({ count: this.state.count + 1 })
      const res = await axios.get(`/juz/${i}`)
      tmp.push(res.data.data)
      this.setState({ juz: tmp })
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className='mb-4 p-4'>
            <p className='text-xs-gray'>Al-Quran</p>
            <h1 className='font-bold text-lg'>Reading Surah</h1>
          </div>
          <div className='relative mb-4 px-4'>
            <input className='bg-blue-50 rounded-full w-full px-4 py-2 focus:outline-none font-thin' placeholder='Search Surah' />
            <i className='fas fa-search text-blue-500 absolute top-3 right-8'></i>
          </div>
          <div className='mb-4 px-4'>
            {
              this.state.surah.length ?
                <QuickAccess surah={this.state.surah} /> : ''
            }
          </div>
          <div>
            {
              this.state.surah.length && this.state.juz.length ?
                <List surah={this.state.surah} juz={this.state.juz} /> : ''
            }
          </div>
        </div>
        {/* <Menu /> */}
      </div>
    )
  }
}
export default Home
