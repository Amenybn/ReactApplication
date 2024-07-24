import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  CCardBody,
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CButton,
  CFormTextarea,
} from '@coreui/react';

// Configure AWS SDK
const s3 = new S3Client({
  region: 'eu-west-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN,
  },
});
const bucketName = 'ticket-dev-bucket';

const MyComponent = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    filmName: '',
    adultPrice: '',
    childPrice: '',
    room: '',
    numberOfPlaces: '',
    date: '',
    description: '',
    filmImage: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      filmImage: file,
    });
  };

  const uploadImageToS3 = async (file) => {
    const params = {
      Bucket: bucketName,
      Key: `images/${file.name}`, // Use a unique key for each file
      Body: file,
      ContentType: file.type,
    };
    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (formData.filmImage) {
        await uploadImageToS3(formData.filmImage);
      }
      // Handle form submission, e.g., send other form data to server
      console.log(formData);
    }
    setValidated(true);
  };

  const handleCancel = () => {
    setFormData({
      filmName: '',
      adultPrice: '',
      childPrice: '',
      room: '',
      numberOfPlaces: '',
      date: '',
      description: '',
      filmImage: null,
    });
    setValidated(false);
  };

  return (
    <CCardBody>
            <h3 className="mb-4" style={{ color: '#e67e30' }}>ADD NEW FILM</h3>

      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CCol md={6}>
          <CFormInput
            type="text"
            name="filmName"
            label="Film Name"
            required
            value={formData.filmName}
            onChange={handleInputChange}
            feedbackInvalid="Please enter the film name."
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
          <CFormTextarea
            name="description"
            label="Description"
            required
            value={formData.description}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a description."
          />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="filmImage">Film Image</CFormLabel>
          <CFormInput
            type="file"
            id="filmImage"
            name="filmImage"
            onChange={handleImageChange}
            feedbackInvalid="Please select a film image."
          />
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
  );
};

export default MyComponent;
