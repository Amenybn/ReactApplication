import './style/button.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Button() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/home') // Navigate to the home page
  }

  return (
    <button className="btn" onClick={handleClick}>
      Back to homepage
    </button>
  )
}

export default Button
