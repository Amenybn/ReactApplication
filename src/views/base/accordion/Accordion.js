import React, { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilSearch } from '@coreui/icons'

// Fonction pour définir la couleur du bouton en fonction du statut
const getStatusButtonColor = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
}

const ReservationTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reservations, setReservations] = useState([
    {
      id: 1,
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      userNumber: '1234567890',
      status: 'Confirmed',
      filmName: 'Film 1',
      filmDate: '2024-07-25',
      numberOfChildSeats: 2,
      numberOfAdultSeats: 2,
      totalPrice: 30,
    },
    // Ajoutez plus de réservations ici selon vos besoins
  ]);

  // Filtrage des réservations en fonction du terme de recherche
  const filteredReservations = reservations.filter((reservation) =>
    reservation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.filmName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

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
            <CTableHeaderCell>Upload</CTableHeaderCell> {/* Nouvelle colonne ajoutée */}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredReservations.map((reservation) => (
            <CTableRow key={reservation.id}>
              <CTableDataCell>{reservation.userName}</CTableDataCell>
              <CTableDataCell>{reservation.userEmail}</CTableDataCell>
              <CTableDataCell>{reservation.userNumber}</CTableDataCell>
              <CTableDataCell>
                <CButton color={getStatusButtonColor(reservation.status)} className="float-end">
                  {reservation.status}
                </CButton>
              </CTableDataCell>
              <CTableDataCell>{reservation.filmName}</CTableDataCell>
              <CTableDataCell>{reservation.filmDate}</CTableDataCell>
              <CTableDataCell>{reservation.numberOfChildSeats}</CTableDataCell>
              <CTableDataCell>{reservation.numberOfAdultSeats}</CTableDataCell>
              <CTableDataCell>${reservation.totalPrice}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" className="float-end">
                  <CIcon icon={cilCloudDownload} />
                </CButton>
              </CTableDataCell> {/* Nouvelle cellule ajoutée */}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  )
}

export default ReservationTable
