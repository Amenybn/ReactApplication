import React, { useState } from 'react'
import {
  CCardBody,
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CButton,
  CFormTextarea,
} from '@coreui/react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

// Configure S3 Client
const s3Client = new S3Client({
  region: 'eu-west-1',
  credentials: {
    accessKeyId: 'ASIA46YWIEOE7U6BSC3O',
    secretAccessKey: 'Pevhn8p6cOJYB9hPR5rNAr0cueTQrYkEoYGrMbV3',
  },
})

const MyForm = () => {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    adultPrice: '',
    childPrice: '',
    room: '',
    numberOfPlaces: '',
    date: '',
    image: '',
  })
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Preview the image
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)

      // Set the image file
      setImageFile(file)
    }
  }
  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()

      // Convert image file to base64
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1] // Extract base64 string
        const jsonDataToSend = {
          name: formData.name,
          description: formData.description,
          adultPrice: parseFloat(formData.adultPrice),
          childPrice: parseFloat(formData.childPrice),
          room: formData.room,
          numberOfPlaces: parseInt(formData.numberOfPlaces, 10),
          date: new Date(formData.date).toISOString(),
          image: base64Image, // Include base64 image
        }

        console.log('JSON data to send:', jsonDataToSend)

        try {
          const response = await fetch(
            'https://e8z9o2hxm4.execute-api.us-east-1.amazonaws.com/dev/Film',
            {
              node: 'cors',
              method: 'POST',
              body: JSON.stringify(jsonDataToSend),
            },
          )
          if (response) {
            console.log('Server response:', await response.json())
            // Handle success (e.g., display a message, reset form, etc.)
          } else {
            console.error('Server error:', response.statusText)
            // Handle server error (e.g., display an error message)
          }
        } catch (error) {
          console.error('Error:', error)
          // Handle network error (e.g., display an error message)
        }
      }
      reader.readAsDataURL(imageFile)
    }
    setValidated(true)
  }
  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      adultPrice: '',
      childPrice: '',
      room: '',
      numberOfPlaces: '',
      date: '',
      image: '',
    })
    setImagePreview('')
    setValidated(false)
  }

  return (
    <CCardBody>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CCol md={6}>
          <CFormInput
            type="text"
            name="name"
            label="Film Name"
            required
            value={formData.name}
            onChange={handleInputChange}
            feedbackInvalid="Please enter the product name."
          />
        </CCol>
        <CCol md={12}>
          <CFormTextarea
            name="description"
            label="Description"
            required
            value={formData.description}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a description."
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="number"
            name="adultPrice"
            label="Adult Price"
            required
            value={formData.adultPrice}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a valid adult price."
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="number"
            name="childPrice"
            label="Child Price"
            required
            value={formData.childPrice}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a valid child price."
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            name="room"
            label="Room"
            required
            value={formData.room}
            onChange={handleInputChange}
            feedbackInvalid="Please enter the room."
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="number"
            name="numberOfPlaces"
            label="Number of Places"
            required
            value={formData.numberOfPlaces}
            onChange={handleInputChange}
            feedbackInvalid="Please enter the number of places."
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="date"
            name="date"
            label="Date"
            required
            value={formData.date}
            onChange={handleInputChange}
            feedbackInvalid="Please select a valid date."
          />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="filmImage">Film Image</CFormLabel>
          <CFormInput type="file" id="filmImage" name="filmImage" onChange={handleImageChange} />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          )}
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

export default MyForm
