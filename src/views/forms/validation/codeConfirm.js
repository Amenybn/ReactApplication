import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CodeConfirm() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { reservationId } = location.state || {};

  if (!reservationId) {
    return <p>No reservation ID available</p>;
  }

  console.log('Reservation ID:', reservationId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://e8z9o2hxm4.execute-api.us-east-1.amazonaws.com/dev/Reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: reservationId, code: code }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Server response:', responseData);
        setSuccess(true);
        // Optionally, you can navigate to another page after a successful confirmation
        // setTimeout(() => navigate('/home'), 3000);
      } else {
        console.error('Server error:', response.statusText);
        setError('Confirmation failed. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Confirm Reservation</h2>
      <p>Reservation ID: {reservationId}</p>
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
  );
}
