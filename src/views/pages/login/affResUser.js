import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../../css/bootstrap.css';
import '../../../css/font-awesome.min.css';
import '../../../css/style.css';
import '../../../css/responsive.css';
import logo from '../../../images/about-img.png';
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
  const mapRef = useRef(null);

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
    <div className="hero_area">
      {/* Header Section */}
      <header className="header_section">
        <div className="header_top">
          <div className="container-fluid header_top_container">
            <a className="navbar-brand" href="index.html">
              <img src={logo} alt="CineClick Logo" style={{ height: '60px' }} />
            </a>
            <div className="contact_nav">
              <a href="#mapSection" onClick={(e) => { e.preventDefault(); mapRef.current.scrollIntoView({ behavior: 'smooth' }) }}>
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <span>Location</span>
              </a>
              <a href="">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span>Call : +216 75888000</span>
              </a>
              <a href="">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>cineclick@gmail.com</span>
              </a>
            </div>
            <div className="social_box">
              <a href="#">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="header_bottom">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand navbar_brand_mobile" href="index.html">
                Tro<span>Weld</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className=""></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact.html">
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="service.html">
                      Reservations
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="portfolio.html">
                      Films
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <span>Profile</span>
                    </a>
                  </li>
                  <form className="form-inline">
                    <button className="btn my-2 my-sm-0 nav_search-btn" type="submit">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </form>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {/* End Header Section */}

      {/* Slider Section */}
      <section className="slider_section">
        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="detail-box">
                  <h1 className="display-1 text-capitalize text-white mb-4">
                    Welcome to CineClick!
                  </h1>
                  <h7 className="text-white">
                    Easily book your movie tickets with CineClick. Discover the latest films, choose
                    your seats, and enjoy a hassle-free cinematic experience. The best of cinema is
                    just a click away!
                  </h7>
                  <div className="btn-box">
                    <a href="#" className="btn1">
                      Read More
                    </a>
                    <a href="#mapSection" className="btn2">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Slider Section */}

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

    
      <br></br>
<br></br>
<section class="info_section ">
    <div class="info_container layout_padding2">
      <div class="container">
        <div class="info_logo">
          <a class="navbar-brand" href="index.html"> Tro<span>Weld</span> </a>
        </div>
        <div class="info_main">
          <div class="row">
            <div class="col-md-3 col-lg-2">
              <div class="info_link-box">
                <h5>
                  Useful Link
                </h5>
                <ul>
                  <li class=" active">
                    <a class="" href="index.html">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="">
                    <a class="" href="about.html">About </a>
                  </li>
                  <li class="">
                    <a class="" href="service.html">Services </a>
                  </li>
                  <li class="">
                    <a class="" href="portfolio.html"> Portfolio </a>
                  </li>
                  <li class="">
                    <a class="" href="contact.html"> Contact </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-3 ">
              <h5>
                Welding
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur
                adipiscinaliquaLoreadipiscing
              </p>
            </div>
            <div class="col-md-3 mx-auto  ">
              <h5>
                social media
              </h5>
              <div class="social_box">
                <a href="#">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fa fa-linkedin" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fa fa-youtube-play" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div class="col-md-3">
              <h5>
                Our welding center
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur
                adipiscinaliquaLoreadipiscing
              </p>
            </div>
          </div>
        </div>
        <div class="info_bottom">
          <div class="row">
            <div class="col-lg-9">
              <div class="info_contact ">
                <div class="row">
                  <div class="col-md-3">
                    <a href="#" class="link-box">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                      <span>
                        Location
                      </span>
                    </a>
                  </div>
                  <div class="col-md-5">
                    <a  class="link-box">
                      <i class="fa fa-phone" aria-hidden="true"></i>
                      <span>
                        Call +01 1234567890
                      </span>
                    </a>
                  </div>
                  <div class="col-md-4">
                    <a  class="link-box">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                      <span>
                        demo@gmail.com
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="info_form ">
                <form action="">
                  <input type="email" placeholder="Enter Your Email" />
                  <button>
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Map Section */}
      <section className="map_section" ref={mapRef}>
        <div className="container-fluid">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.2007865170126!2d10.096801297473574!3d33.88448236908293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556f9cea7b178d%3A0xbb3080c20e2ebc03!2sCin%C3%A9ma%20Pour%20Tous!5e0!3m2!1sen!2sbd!4v1721673024226!5m2!1sen!2sbd"

            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ReservationTable;
