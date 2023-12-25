import React from 'react'

export default function Info() {
  return (
    <>
      <section className="pet_service">
        <div className="custom-container">
          <div className="pet_service_row contact_serviec">
            <div className="pet_service_column">
              <figure>
                <img src="images/service_bg.png" alt="image" />
                <img
                  className="hover_img"
                  src="images/service_bg_hover.png"
                  alt="image"
                />
                <a className="icon_img" href="#">
                  <img src="images/Contact-US-icon-01.png" alt="image" />
                </a>
              </figure>
              <h6>Opening Time </h6>
              <p>
                <a href="#">Sun - Fri : 9:00 am - 5 : 00 pm</a>{" "}
                <a href="#">Sun - Fri : 9:00 am - 5 : 00 pm</a>
              </p>
            </div>
            <div className="pet_service_column">
              <figure>
                <img src="images/service_bg.png" alt="image" />
                <img
                  className="hover_img"
                  src="images/service_bg_hover.png"
                  alt="image"
                />
                <a className="icon_img" href="#">
                  <img src="images/Contact-US-icon-02.png" alt="image" />
                </a>
              </figure>
              <h6>Contact Number</h6>
              <p>
                <a href="#">+880 1234 56789</a> <a href="#">+02 5898586</a>
              </p>
            </div>
            <div className="pet_service_column">
              <figure>
                <img src="images/service_bg.png" alt="image" />
                <img
                  className="hover_img"
                  src="images/service_bg_hover.png"
                  alt="image"
                />
                <a className="icon_img" href="#">
                  <img src="images/Contact-US-icon-03.png" alt="image" />
                </a>
              </figure>
              <h6>Email Address</h6>
              <p>
                <a href="#">valkutainfo@gmail.com</a>{" "}
                <a href="#">info@valkuta.com</a>
              </p>
            </div>
            <div className="pet_service_column">
              <figure>
                <img src="images/service_bg.png" alt="image" />
                <img
                  className="hover_img"
                  src="images/service_bg_hover.png"
                  alt="image"
                />
                <a className="icon_img" href="#">
                  <img src="images/Contact-US-icon-04.png" alt="image" />
                </a>
              </figure>
              <h6>Our Location </h6>
              <p>
                <a href="#">Our Location</a>{" "}
                <a href="#">Nevis, West Indies, Caribbea</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
