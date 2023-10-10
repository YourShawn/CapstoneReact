import React from "react";
import "../styles/component/footer.css";
const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer_wrapper">
          <div class="footer_col2">
            <h5>Site Links</h5>
            <ul className="list">
              <a href="#">
                <li>Home</li>
              </a>
              <a href="#">
                <li>About</li>
              </a>
              <a href="#">
                <li>Service</li>
              </a>
              <a href="#">
                <li>Contact us</li>
              </a>
            </ul>
          </div>
          <div class="footer_col2">
            <h5>External links</h5>
            <ul className="list">
              <a href="#">
                <li>EMR</li>
              </a>
              <a href="#">
                <li>Pharmacy</li>
              </a>
              <a href="#">
                <li>Prescription Management</li>
              </a>
              <a href="#">
                <li>Appointment Management</li>
              </a>
              <a href="#">
                <li>Our Doctors</li>
              </a>
            </ul>
          </div>
          <div class="footer_col1">
            
            <h5 class="subline">An Expert in Health Care.</h5>
            <div class="address">
              <p>Conestoga College Kitchener, Doon Valley, Canada</p>
            </div>
            <div class="social_links">
              <a href="#">
                <img src="/icons/linkdin.svg" alt="" />
              </a>
              <a href="#">
                <img src="/icons/facebook.svg" alt="" />
              </a>
              <a href="#">
                <img src="/icons/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/icons/insta.svg" alt="" />
              </a>
              <a href="#">
                <img src="/icons/youtube.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
