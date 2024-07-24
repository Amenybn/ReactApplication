import React, { useState } from 'react'
import {
  CCardBody,
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CFormSelect
} from '@coreui/react'

const UserForm = () => {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'customer' // default role
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      // Handle form submission, e.g., send data to server
      console.log('Form Data Submitted:', formData)
    }
    setValidated(true)
  }

  const handleCancel = () => {
    setFormData({
      userName: '',
      email: '',
      password: '',
      role: 'customer'
    })
    setValidated(false)
  }

  return (
    <CCardBody>
           <h3 className="mb-4" style={{ color: '#e67e30' }}>ADD NEW USER</h3>

      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CCol md={6}>
          <CFormLabel htmlFor="userName">User Name</CFormLabel>
          <CFormInput
            type="text"
            id="userName"
            name="userName"
            required
            value={formData.userName}
            onChange={handleInputChange}
            feedbackInvalid="Please enter the user name."
          />
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a valid email address."
          />
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="password">Password</CFormLabel>
          <CFormInput
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a password."
          />
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="role">Role</CFormLabel>
          <CFormSelect
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </CFormSelect>
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Submit form
          </CButton>
          <CButton color="secondary" type="button" onClick={handleCancel} className="ms-2">
            Cancel
          </CButton>
        </CCol>
      </CForm>
    </CCardBody>
  )
}

export default UserForm
