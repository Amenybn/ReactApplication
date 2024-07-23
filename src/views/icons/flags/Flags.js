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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CCol,
  CRow,
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const UserTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      userName: 'User 1',
      email: 'user1@example.com',
      role: 'customer'
    },
    // Add more users as needed
  ])

  const [editingUser, setEditingUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const handleEdit = (user) => {
    setEditingUser(user)
    setModalVisible(true)
  }

  const handleDelete = (user) => {
    setUserToDelete(user)
    setDeleteModalVisible(true)
  }

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== userToDelete.id))
    setDeleteModalVisible(false)
    setUserToDelete(null)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditingUser({ ...editingUser, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)))
    setModalVisible(false)
  }

  const handleCancel = () => {
    setEditingUser(null)
    setModalVisible(false)
  }

  return (
    <CCardBody>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Select</CTableHeaderCell>
            <CTableHeaderCell>User Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Role</CTableHeaderCell>
            <CTableHeaderCell>Edit</CTableHeaderCell>
            <CTableHeaderCell>Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => (
            <CTableRow key={user.id}>
              <CTableDataCell>
                <CFormCheck />
              </CTableDataCell>
              <CTableDataCell>{user.userName}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.role}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" onClick={() => handleEdit(user)}>
                  <CIcon icon={cilPencil} />
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" onClick={() => handleDelete(user)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal
        size="lg"
        visible={modalVisible}
        onClose={handleCancel}
        aria-labelledby="EditUserModal"
      >
        <CModalHeader>
          <CModalTitle id="EditUserModal">Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {editingUser && (
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    name="userName"
                    label="User Name"
                    value={editingUser.userName}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="email"
                    name="email"
                    label="Email"
                    value={editingUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormSelect
                    name="role"
                    label="Role"
                    value={editingUser.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </CFormSelect>
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
          )}
        </CModalBody>
      </CModal>

      <CModal
        size="sm"
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        aria-labelledby="DeleteUserModal"
      >
        <CModalHeader>
          <CModalTitle id="DeleteUserModal">Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this user?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CCardBody>
  )
}

export default UserTable
