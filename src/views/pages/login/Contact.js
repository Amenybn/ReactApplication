import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../../css/bootstrap.css'
import '../../../css/font-awesome.min.css'
import '../../../css/style.css'
import '../../../css/responsive.css'
import logo from '../../../images/about-img.png'

const Contact = () => {
  const navigate = useNavigate()
  const [films, setFilms] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const productsPerPage = 3
  const totalProducts = films.length

  const aboutRef = useRef(null)
  const mapRef = useRef(null)

  const handleNext = () => {
    if (currentIndex + productsPerPage < totalProducts) {
      setCurrentIndex(currentIndex + productsPerPage)
    }
  }

  const handlePrev = () => {
    if (currentIndex - productsPerPage >= 0) {
      setCurrentIndex(currentIndex - productsPerPage)
    }
  }

  const visibleFilms = films.slice(currentIndex, currentIndex + productsPerPage)

  

  const handleReadMoreClick = (event) => {
    event.preventDefault()
    setShowMore(!showMore)
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLocationClick = (event) => {
    event.preventDefault()
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          'https://7r5lw4iss0.execute-api.us-east-1.amazonaws.com/production/products',
        )
        const responseData = JSON.parse(response.data.body)

        if (Array.isArray(responseData)) {
          setFilms(responseData)
        } else {
          console.error('Error: Response data is not an array', responseData)
        }
      } catch (error) {
        console.error('Error fetching films:', error)
      }
    }

    fetchFilms()
  }, [])

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
              <a href="#" onClick={handleLocationClick}>
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
              <a>
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a>
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a>
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a>
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
                    <a className="nav-link" href="about.html" onClick={(e) => { e.preventDefault(); aboutRef.current.scrollIntoView({ behavior: 'smooth' }) }}>
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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
                    <a href="#" className="btn1" onClick={handleReadMoreClick}>
                      Read More
                    </a>
                    <a href="#" className="btn2" onClick={handleLocationClick}>
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Ajoutez plus d'éléments ici si nécessaire */}
          </div>
         
        </div>
      </section>
      {/* End Slider Section */}
<br></br>
<br></br>
<br></br>
<br></br>

      <section className="contact_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Get In <span>Touch</span></h2>
          </div>
          <div className="row">
            <div className="col-md-6 px-0">
              <div className="form_container">
                <form>
                  
                  <div className="form-row">
                    <div className="form-group col-lg-6">
                      <input type="text" className="form-control" placeholder="Phone Number" />
                    </div>
                   
                  </div>
                
                  <div className="form-row">
                    <div className="form-group col">
                      <input type="text" className="message-box form-control" placeholder="Message" />
                    </div>
                  </div>
                  <div className="btn_box">
                    <button type="submit">
                      SEND
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 px-0">
              <div className="map_container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.2007865170126!2d10.096801297473574!3d33.88448236908293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556f9cea7b178d%3A0xbb3080c20e2ebc03!2sCin%C3%A9ma%20Pour%20Tous!5e0!3m2!1sen!2sbd!4v1721673024226!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
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
      {/* End Map Section */}
    </div>
  )
}

export default Contact
