import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../../../css/bootstrap.css'
import '../../../css/font-awesome.min.css'
import '../../../css/style.css'
import '../../../css/responsive.css'
import logo from '../../../images/about-img.png'
import { getCurrentUser } from '../auth'

const DetailProduct = () => {
  const location = useLocation()
  const { film } = location.state || {}
  if (!film) {
    return <p>No film selected</p>
  }
  console.log(film)

  const [user, setUser] = useState()
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
        setPhone(currentUser.phone || '')
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

  console.log(user)

  return (
    <div className="sub_page">
      <div className="hero_area">
        <header className="header_section">
          <div className="header_top">
            <div className="container-fluid header_top_container">
              <a className="navbar-brand" href="index.html">
                {' '}
                Tro<span>Weld</span>{' '}
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
                  {' '}
                  Tro<span>Weld</span>{' '}
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
                  <form>
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
                        <select
                          name=""
                          id=""
                          className="form-control wide"
                          value={adultTickets}
                          onChange={(e) => setAdultTickets(Number(e.target.value))}
                        >
                          <option value={0}>Number of adult tickets</option>
                          {[...Array(10).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-lg-6">
                        <select
                          name=""
                          id=""
                          className="form-control wide"
                          value={childTickets}
                          onChange={(e) => setChildTickets(Number(e.target.value))}
                        >
                          <option value={0}>Number of child tickets</option>
                          {[...Array(10).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <br />
                      <br />
                      <br />
                      <br />
                      <h3>Total price: {totalPrice} DT</h3>
                      <div className="col-12">
                        <button
                          className="btn-hover-bg btn btn-primary w-100 py-3 px-5"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-xl-7">
                  <div>
                    <div className="row g-4">
                      <div className="col-lg-4">
                        <div className="bg-white p-3">
                          <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
                            <p></p>
                            <h4>Adult Price:</h4>
                            <p></p>
                            <h5 className="text-uppercase text-primary">{film.adultPrice} DT</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="bg-white p-3">
                          <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
                            <p></p>
                            <h4>Child Price:</h4>
                            <p></p>
                            <h5 className="text-uppercase text-primary">{film.childPrice} DT</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="bg-white p-3">
                          <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
                            <p></p>
                            <h4>Film Room:</h4>
                            <p></p>
                            <h5 className="text-uppercase text-primary">{film.room} </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ marginTop: '10px' }}>
                      <iframe
                        src={
                          film.mapUrl ||
                          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.2007865170126!2d10.096801297473574!3d33.88448236908293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556f9cea7b178d%3A0xbb3080c20e2ebc03!2sCin%C3%A9ma%20Pour%20Tous!5e0!3m2!1sen!2sbd!4v1721673024226!5m2!1sen!2sbd'
                        }
                        width="720"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
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