import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './DuckView.scss'

export const HomeView = () => (
  <div>
    <h4>This is a duck!</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
  </div>
)

export default HomeView
