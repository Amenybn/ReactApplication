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
  CImage,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CCol,
  CRow,
  CInputGroup,
  CInputGroupText
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilSearch } from '@coreui/icons'

const FilmTable = () => {
  const [films, setFilms] = useState([
    {
      id: 1,
      filmImage: 'https://via.placeholder.com/100',
      filmName: 'Film 1',
      adultPrice: 10,
      childPrice: 5,
      room: 'Room 1',
      numberOfPlaces: 100,
      date: '2024-07-25',
      description: 'Description 1',
    },
    // Add more films as needed
  ])

  const [filteredFilms, setFilteredFilms] = useState(films)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingFilm, setEditingFilm] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleEdit = (film) => {
    setEditingFilm(film)
    setModalVisible(true)
  }

  const handleDelete = (id) => {
    setFilms(films.filter((film) => film.id !== id))
    console.log('Deleted film with id:', id)
  }

  const handleSearchChange = (event) => {
    const term = event.target.value
    setSearchTerm(term)
    setFilteredFilms(films.filter(film => film.filmName.toLowerCase().includes(term.toLowerCase())))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditingFilm({ ...editingFilm, [name]: value })
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setEditingFilm({ ...editingFilm, filmImage: URL.createObjectURL(file) })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFilms(films.map((film) => (film.id === editingFilm.id ? editingFilm : film)))
    setFilteredFilms(films.map((film) => (film.id === editingFilm.id ? editingFilm : film))) // Update filtered films as well
    setModalVisible(false)
  }

  const handleCancel = () => {
    setEditingFilm(null)
    setModalVisible(false)
  }

  return (
    <CCardBody>
      <CRow className="mb-3 align-items-center">
        <CCol md={6}>
          <h3>List of Films</h3>
        </CCol>
        <CCol md={6} className="d-flex justify-content-end align-items-center">
          <CInputGroup style={{ maxWidth: '300px', marginRight: '10px' }}>
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
          <CButton color="primary" onClick={() => setModalVisible(true)}>
            Add New Film
          </CButton>
        </CCol>
      </CRow>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Select</CTableHeaderCell>
            <CTableHeaderCell>Film Image</CTableHeaderCell>
            <CTableHeaderCell>Film Name</CTableHeaderCell>
            <CTableHeaderCell>Adult Price</CTableHeaderCell>
            <CTableHeaderCell>Child Price</CTableHeaderCell>
            <CTableHeaderCell>Room</CTableHeaderCell>
            <CTableHeaderCell>Number of Places</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Edit</CTableHeaderCell>
            <CTableHeaderCell>Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredFilms.map((film) => (
            <CTableRow key={film.id}>
              <CTableDataCell>
                <CFormCheck />
              </CTableDataCell>
              <CTableDataCell>
                <CImage src={film.filmImage} alt={film.filmName} width={50} height={50} />
              </CTableDataCell>
              <CTableDataCell>{film.filmName}</CTableDataCell>
              <CTableDataCell>${film.adultPrice}</CTableDataCell>
              <CTableDataCell>${film.childPrice}</CTableDataCell>
              <CTableDataCell>{film.room}</CTableDataCell>
              <CTableDataCell>{film.numberOfPlaces}</CTableDataCell>
              <CTableDataCell>{film.date}</CTableDataCell>
              <CTableDataCell>{film.description}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" onClick={() => handleEdit(film)}>
                  <CIcon icon={cilPencil} />
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" onClick={() => handleDelete(film.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal
        size="xl"
        visible={modalVisible}
        onClose={handleCancel}
        aria-labelledby="EditFilmModal"
      >
        <CModalHeader>
          <CModalTitle id="EditFilmModal">{editingFilm ? 'Edit Film' : 'Add New Film'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="filmName"
                  label="Film Name"
                  value={editingFilm?.filmName || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="room"
                  label="Room"
                  value={editingFilm?.room || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="number"
                  name="adultPrice"
                  label="Adult Price"
                  value={editingFilm?.adultPrice || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  name="childPrice"
                  label="Child Price"
                  value={editingFilm?.childPrice || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="number"
                  name="numberOfPlaces"
                  label="Number of Places"
                  value={editingFilm?.numberOfPlaces || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="date"
                  name="date"
                  label="Date"
                  value={editingFilm?.date || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormInput
                  type="textarea"
                  name="description"
                  label="Description"
                  value={editingFilm?.description || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormInput
                  type="file"
                  name="filmImage"
                  label="Film Image"
                  onChange={handleImageChange}
                />
                {editingFilm?.filmImage && (
                  <CImage src={editingFilm.filmImage} alt="Selected" width={100} height={100} />
                )}
              </CCol>
            </CRow>
            <CModalFooter>
              <CButton color="secondary" onClick={handleCancel}>
                Cancel
              </CButton>
              <CButton color="primary" type="submit">
                Save changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </CCardBody>
  )
}

export default FilmTable
