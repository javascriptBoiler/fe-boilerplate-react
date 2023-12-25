import React from 'react'
import AuthFooter from '../../../../components/AuthFooter'
import { FacebookFilled, TwitterCircleFilled, CameraFilled, YoutubeFilled } from '@ant-design/icons';

export default function Footer() {
  return (
    <>
      <div className="pet_widget">
            <div className="custom-container">
              <div className="main_widget_row">
                <div className="widget_contact">
                   <h6 className="widget_title">Contacts Us</h6>
                  <div className="main_widget_column">
                    <span><img src="images/phone-fig.png"/></span>
                    <div className="main_widget_contact">
                      <a href="#">+880-176-1111-456</a>
                      <a href="#">+880-170-1111-000</a>
                    </div>
                  </div>
                  <div className="main_widget_column">
                    <span><img src="images/envelope-fig.png"/></span>
                    <div className="main_widget_contact">
                      <a href="#">info@PetSitting.com</a>
                      <a href="#">Support@PetSitting.com</a>
                    </div>
                  </div>
                  <div className="main_widget_column">
                    <span><img src="images/map-fig.png"/></span>
                    <div className="main_widget_contact">
                      <a href="#">168/170, Avenue 01, Newland,<br/>
                      New york, USA</a>
                    </div>
                  </div>
                </div>

                <div className="pet_widget_column">
                  <figure><img src="images/top-logo.png"/></figure>
                  <p>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis </p>
                  <ul className="widget_social_share">
                    <li><a className="hover-affect" href="#"><FacebookFilled/></a></li>
                    <li><a className="hover-affect" href="#"><TwitterCircleFilled/></a></li>
                    <li><a className="hover-affect" href="#"><CameraFilled/></a></li>
                    <li><a className="hover-affect" href="#"><YoutubeFilled/></a></li>
                  </ul>
                  <a className="main_button btn2 bdr-clr hover-affect" href="#">Book Book Now</a>
                </div>
                <div className="pet_widget_column widtget-hours">
                   <h6 className="widget_title">Opening Hours</h6>
                    <ul className="pet_widget_link">
                      <li><a href="#">Monday </a><span>09:00 am - 06:00 pm</span></li>
                      <li><a href="#">Tuesday </a><span>09:00 am - 06:00 pm</span></li>
                      <li><a href="#">Wednesday</a><span>09:00 am - 06:00 pm</span></li>
                      <li><a href="#">Wednesday</a><span>09:00 am - 06:00 pm</span></li>
                      <li><a href="#">Friday</a><span>09:00 am - 06:00 pm</span></li>
                      <li><a href="#">Saturday</a><span>09:00 am - 06:00 pm</span></li>
                      <li><a href="#">Sunday</a><span>09:00 am - 06:00 pm</span></li>
                    </ul>
              </div>
            </div>
        </div>
        <div className="pet_copyright" style={{background:'white'}}>
            <>
              <AuthFooter/>
            </>
          </div> 
      </div>
    </>
  )
}
