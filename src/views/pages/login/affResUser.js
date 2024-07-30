import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
import { getCurrentUser } from '../auth'; // Import your function to get the current user's info

const getStatusButtonColor = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'success';
    case 'Pending':
      return 'warning';
    default:
      return 'secondary';
  }
};

const ReservationTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUserEmail(currentUser.email || '');
      } catch (err) {
        console.error('Error fetching user email:', err);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await axios.get('https://7r5lw4iss0.execute-api.us-east-1.amazonaws.com/production/reservation');
        const responseData = JSON.parse(response.data.body);
        if (Array.isArray(responseData)) {
          setReservations(responseData);
        } else {
          console.error('Error: Response data is not an array', responseData);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchUser();
    fetchReservations();
  }, []);

  const filteredReservations = reservations.filter((reservation) =>
    reservation.email === userEmail
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <CCardBody>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-4" style={{ color: '#e67e30' }}>LIST OF FILM RESERVATIONS</h3>
        <CInputGroup style={{ maxWidth: '300px' }}>
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
          <CFormInput
            type="text"
            placeholder="Search films..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </CInputGroup>
      </div>
      <CTable bordered hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>User Name</CTableHeaderCell>
            <CTableHeaderCell>User Email</CTableHeaderCell>
            <CTableHeaderCell>User Number</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Film Name</CTableHeaderCell>
            <CTableHeaderCell>Film Date</CTableHeaderCell>
            <CTableHeaderCell>NB Child Seats</CTableHeaderCell>
            <CTableHeaderCell>NB Adult Seats</CTableHeaderCell>
            <CTableHeaderCell>Total Price</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredReservations.filter((reservation) => {
            const username = reservation.username || '';
            const email = reservation.email || '';
            const filmName = reservation.filmName || '';

            return (
              username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              filmName.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }).map((reservation) => (
            <CTableRow key={reservation.id}>
              <CTableDataCell>{reservation.username}</CTableDataCell>
              <CTableDataCell>{reservation.email}</CTableDataCell>
              <CTableDataCell>{reservation.phoneNumber}</CTableDataCell>
              <CTableDataCell>
                <CButton color={getStatusButtonColor(reservation.status)} className="float-end">
                  {reservation.status}
                </CButton>
              </CTableDataCell>
              <CTableDataCell>{reservation.filmName}</CTableDataCell>
              <CTableDataCell>{reservation.date}</CTableDataCell>
              <CTableDataCell>{reservation.nbOfplaceReserveEnfant}</CTableDataCell>
              <CTableDataCell>{reservation.numberOfPlaceAdulte}</CTableDataCell>
              <CTableDataCell>${reservation.totalPrice}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  );
};

export default ReservationTable;
