import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CodeConfirm() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const location = useLocation()
  const { id } = location.state || {}
  if (!id) {
    return <p>No film selected</p>
  }
  console.log(id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(
        'https://e8z9o2hxm4.execute-api.us-east-1.amazonaws.com/dev/Reservation',
        {
          method: 'POST',
          body: JSON.stringify({ id: id, code: code }),
        },
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setSuccess(true)
        setTimeout(() => {
          navigate('/home')
        }, 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Confirmation failed')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Confirm Reservation</h2>
      <p>Reservation ID: {id}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
      {error && <p>{error}</p>}
      {success && (
        <div>
          <h2>Confirmation successful!</h2>
          <p>You can download your reservation!!</p>
        </div>
      )}
    </div>
  )
}
