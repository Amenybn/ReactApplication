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
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'

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
  ])

  return (
    <CCardBody>
      <CTable bordered hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Select</CTableHeaderCell>
            <CTableHeaderCell>User Name</CTableHeaderCell>
            <CTableHeaderCell>User Email</CTableHeaderCell>
            <CTableHeaderCell>User Number</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Film Name</CTableHeaderCell>
            <CTableHeaderCell>Film Date</CTableHeaderCell>
            <CTableHeaderCell>Number of Child Seats</CTableHeaderCell>
            <CTableHeaderCell>Number of Adult Seats</CTableHeaderCell>
            <CTableHeaderCell>Total Price</CTableHeaderCell>
            <CTableHeaderCell>Upload</CTableHeaderCell> {/* Nouvelle colonne ajoutée */}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {reservations.map((reservation) => (
            <CTableRow key={reservation.id}>
              <CTableDataCell>
                <CFormCheck />
              </CTableDataCell>
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
