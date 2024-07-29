import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom' 
import axios from 'axios'
import '../../../css/bootstrap.css'
import '../../../css/font-awesome.min.css'
import '../../../css/style.css'
import '../../../css/responsive.css'
import logo from '../../../images/about-img.png'
import { getCurrentUser } from '../auth'

const DetailProduct = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { film } = location.state || {}
  if (!film) {
    return <p>No film selected</p>
  }

 

  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [adultTickets, setAdultTickets] = useState(0)
  const [childTickets, setChildTickets] = useState(0)
  const [totalPrice, setTotalPrice] = useState(film.totalPrice || 0)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setEmail(currentUser.email || '')
      } catch (err) {
        console.error(err)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = adultTickets * film.adultPrice + childTickets * film.childPrice
      setTotalPrice(total)
    }
    calculateTotalPrice()
  }, [adultTickets, childTickets, film.adultPrice, film.childPrice])

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const jsonDataToSend = {
      filmId: film.id, // assuming 'film.id' is the correct identifier
      date: new Date(film.date).toISOString(),
      nbOfplaceReserveEnfant: parseInt(childTickets, 10),
      numberOfPlaceAdulte: parseInt(adultTickets, 10),
      totalPrice: parseFloat(totalPrice),
      username: user.username,
      email: email,
      phoneNumber: phone,
      filmName: film.name,
    }

    console.log('JSON data to send:', jsonDataToSend)

    try {
      const response = await fetch(
        'https://7r5lw4iss0.execute-api.us-east-1.amazonaws.com/production/reservation',
        {
          node: 'cors',
          method: 'POST',
          body: JSON.stringify(jsonDataToSend),
        },
      )
      console.log(response)
      event.preventDefault()
      navigate('/confirmReservation', { state: {jsonDataToSend} })
      if (response.ok) {
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
  //tanh taro vxzf lyxr
  return (
    <div className="sub_page">
      <div className="hero_area">
        <header className="header_section">
          <div className="header_top">
            <div className="container-fluid header_top_container">
              <a className="navbar-brand" href="index.html">
                Tro<span>Weld</span>
              </a>
              <div className="contact_nav">
                <a href="">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span>Location</span>
                </a>
                <a href="">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>Call : +01 123455678990</span>
                </a>
                <a href="">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>demo@gmail.com</span>
                </a>
              </div>
              <div className="social_box">
                <a href="">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
                <a href="">
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
                    <li className="nav-item">
                      <a className="nav-link" href="index.html">
                        Home <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="service.html">
                        Services
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="about.html">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="portfolio.html">
                        Portfolio
                      </a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="contact.html">
                        Contact Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <span>Login</span>
                      </a>
                    </li>
                    <form className="form-inline" onSubmit={handleSubmit}>
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
      </div>

      <section className="contact_section layout_padding">
        <section className="about_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="heading_container">
                    <p>FILM DETAILS</p>
                    <h2>
                      <span>{film.name}</span>
                    </h2>
                  </div>
                  <p>Date: {new Date(film.date).toLocaleDateString('en-GB')}</p>
                  <p>Status: {film.status}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img src={film.imageUrl || 'images/p3.jpg'} alt={film.name} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-fluid py-5">
          <div className="form_container">
            <div className="contact p-5">
              <div className="row g-4">
                <div className="col-xl-5">
                  <h1 className="mb-4">{film.name}</h1>
                  <p className="text-dark">
                    <span className="date">
                      <img
                        src="public/images/calendar.png"
                        alt="Calendar"
                        className="calendar-icon"
                      />
                      {new Date(film.date).toLocaleDateString('en-GB')}
                    </span>
                  </p>
                  <p className="text-dark">
                    <i className="fa fa-check text-primary me-2"></i> {film.seatsRemaining} seats
                    remaining
                  </p>
                  <p className="mb-4">
                    Secure your seats for an unforgettable cinema experience. Don’t miss out!
                  </p>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div className="row gx-4 gy-3">
                      <div className="col-xl-6">
                        <input
                          type="text"
                          className="form-control bg-white border-0 py-3 px-4"
                          placeholder="Your Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-6">
                        <input
                          type="email"
                          className="form-control bg-white border-0 py-3 px-4"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-6">
                        <input
                          type="number"
                          className="form-control bg-white border-0 py-3 px-4"
                          placeholder="Number of Adult Tickets"
                          value={adultTickets}
                          onChange={(e) => setAdultTickets(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-6">
                        <input
                          type="number"
                          className="form-control bg-white border-0 py-3 px-4"
                          placeholder="Number of Child Tickets"
                          value={childTickets}
                          onChange={(e) => setChildTickets(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-6">
                        <button className="btn btn-primary border-0 w-100 py-3 px-4" type="submit" >
                          Book Now
                        </button>
                      </div>
                    </div>
                    <br />
                    <div className="col-xl-12">
                      <p>Total Price: {totalPrice.toFixed(2)} USD</p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DetailProduct