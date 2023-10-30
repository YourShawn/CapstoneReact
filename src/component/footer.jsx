import React from "react";
import "../styles/component/footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer_wrapper">
          <div class="footer_col2">
            <h5>Site Links</h5>
            <ul className="list">
              <Link to="#">
                <li>Home</li>
              </Link>
              <Link to="#">
                <li>About</li>
              </Link>
              <Link to="/service">
                <li>Service</li>
              </Link>
              <Link to="#">
                <li>Contact us</li>
              </Link>
            </ul>
          </div>
          <div class="footer_col2">
            <h5>External links</h5>
            <ul className="list">
              <Link to="#">
                <li>EMR</li>
              </Link>
              <Link to="#">
                <li>Pharmacy</li>
              </Link>
              <Link to="#">
                <li>Prescription Management</li>
              </Link>
              <Link to="#">
                <li>Appointment Management</li>
              </Link>
              <Link to="#">
                <li>Our Doctors</li>
              </Link>
            </ul>
          </div>
          <div class="footer_col1">
            <h5 class="subline">An Expert in Health Care.</h5>
            <div class="address">
              <p>Conestoga College Kitchener, Doon Valley, Canada</p>
            </div>
            <div class="social_links">
              <Link to="#">
                <img src="/icons/linkdin.svg" alt="" />
              </Link>
              <Link to="#">
                <img src="/icons/facebook.svg" alt="" />
              </Link>
              <Link to="#">
                <img src="/icons/twitter.svg" alt="" />
              </Link>
              <Link to="#">
                <img src="/icons/insta.svg" alt="" />
              </Link>
              <Link to="#">
                <img src="/icons/youtube.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
