import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

export default function CodeConfirm() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const { jsonDataToSend } = location.state || {}
  if (!jsonDataToSend) {
    return <p>No film selected</p>
  }
  console.log(jsonDataToSend)
const id = jsonDataToSend.filmId
console.log(id)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('https://e8z9o2hxm4.execute-api.us-east-1.amazonaws.com/dev/Reservation', {
        method: 'POST',
       
        body: JSON.stringify({ id, code }),
      })
      console.log(response)
      /*setTimeout(() => {
        navigate('/home')
      }, 3000)*/
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>Confirmation successful!</h2>
        <p>You can Download your Reservation!!</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Confirm Reservation</h2>
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
    </div>
  )
}
