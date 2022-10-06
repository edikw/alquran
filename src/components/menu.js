import './menu.css'
import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 }
  }

  // componentDidMount() {
  //   console.log(window.location.pathname, '??')
  // }

  render() {
    return (
      <div>
        <div className="fixed bottom-0 z-40 w-full md:w-[640px]">
          <div className="bg-white h-18 py-4 box" style={{
            border: '0.5px solid #f0f3f4',
            boxShadow: '0 -5px 5px -5px #dde1e6'
          }}>
            <div className="grid grid-cols-3 items-center">
              <Link to="/" className="text-center focus:outline-none">
                <FontAwesomeIcon icon={['fas', 'house']} className="text-primary-blue" />
              </Link>
              <Link to="/" className="text-center focus:outline-none">
                <FontAwesomeIcon icon={['fas', 'book-open']} className="text-primary-blue" />
              </Link>
              <Link to="/jadwal-sholat" className="text-center focus:outline-none">
                <FontAwesomeIcon icon={['fas', 'mosque']} className="text-primary-blue" />
              </Link>
            </div >
          </div >
        </div >
      </div>
    )
  }
}

export default Menu
