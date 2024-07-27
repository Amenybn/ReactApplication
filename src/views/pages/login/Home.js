import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import axios from 'axios';
import '../../../css/bootstrap.css';
import '../../../css/font-awesome.min.css';
import '../../../css/style.css';
import '../../../css/responsive.css';
import logo from '../../../images/about-img.png'; 

const HomePage = () => {
  const navigate = useNavigate(); // Initialisez navigate ici
  const [films, setFilms] = useState([]);

  const detail = () => {
    navigate('/detailProduct'); // Ajustez ce chemin selon votre configuration de routage
  };

  const handleSeeMore = (event) => {
    event.preventDefault(); // Prévenez le comportement par défaut de l'ancre
    detail(); // Appelez la fonction detail
  };
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get('https://7r5lw4iss0.execute-api.us-east-1.amazonaws.com/production/products');
        const responseData = JSON.parse(response.data.body);

        if (Array.isArray(responseData)) {
          setFilms(responseData);
        } else {
          console.error('Error: Response data is not an array', responseData);
        }
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchFilms();
  }, []);

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
              <a href="">
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
                    <a className="nav-link" href="service.html">Services</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="portfolio.html">Portfolio</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact.html">Contact Us</a>
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
      {/* End Header Section */}

      {/* Slider Section */}
      <section className="slider_section">
        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="detail-box">
                  <h1 className="display-1 text-capitalize text-white mb-4">Welcome to CineClick!</h1>
                  <h7 className="text-white">
                    Easily book your movie tickets with CineClick. Discover the latest films, choose your seats, and enjoy a hassle-free cinematic experience. The best of cinema is just a click away!
                  </h7>
                  <div className="btn-box">
                    <a href="" className="btn1">Read More</a>
                    <a href="" className="btn2">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Ajoutez plus d'éléments ici si nécessaire */}
          </div>
          <div className="carousel_btn-box">
            <a className="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
      {/* End Slider Section */}

      {/* About Section */}
      <section className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About <span>Us</span></h2>
                </div>
                <h1>Our main goal is to revolutionize your cinema experience.</h1>
                <p className="fs-5 mb-4 text-justify">
                  At CineClick, we aim to make movie-going effortless and enjoyable. Our platform allows you to easily discover the latest films, select your preferred seats, and book tickets with just a few clicks. We are passionate about bringing the magic of cinema to your fingertips, ensuring you have a seamless and memorable experience every time. Join us as we transform how you enjoy movies!
                </p>
                <div id="extra-text" style={{ display: 'none' }}>
                  <div className="heading_container">
                    <h2>Our <span>Mission</span></h2>
                  </div>
                  <p className="mb-4">
                    Our mission is to provide an exceptional and user-friendly platform that enhances the movie-going experience. We strive to offer a comprehensive and intuitive service that makes discovering and booking movies as simple as possible. By prioritizing customer satisfaction and continually improving our features, we aim to become the leading choice for cinema enthusiasts worldwide.
                  </p>
                </div>
                <a href="javascript:void(0);" id="read-more">Read More</a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box">
                <img src={logo} alt="About Us" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End About Section */}

      {/* Contact Section */}
      <section className="contact_section">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Discover <span>The Latest Films</span></h2>
          </div>
        </div>
      </section>
      {/* End Contact Section */}

      {/* Portfolio Section */}
      <section className="portfolio_section">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Now Showing!</h2>
          </div>
          <div className="portfolio_list">
            {films.map((film) => (
              <div className="portfolio_item" key={film.productID}>
                <div className="owl-carousel portfolio_carousel">
          <div className="item decorative">
            <div className="box">
              <div className="img-box">
                <img src="images/p1.jpg" alt="" />
                <div className="btn_overlay">
  <a href="#" className="btn" onClick={handleSeeMore}>See More</a>
</div>
              </div>
            </div>
          </div>
        </div> {/* Utilisez film.imageUrl si disponible */}
                <div className="portfolio_info">
                  <h2 className="titlee">{film.name}</h2>
                  <span className="date">
                    <img src="public/images/calendar.png" alt="Calendar" className="calendar-icon" />
                    {new Date(film.date).toLocaleDateString('en-GB')}
                  </span>
                  <p>Prix Adulte: ${film.adultPrice}</p>
                  <p>Prix Enfant: ${film.childPrice}</p>
                  <p>Salle: {film.room}</p>
                  <div className="product-status">
                    <span className="status-text">{film.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Portfolio Section */}
    </div>
  );
};

export default HomePage;
