import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import{  Link } from "@mui/material";
import bannerImage1 from '../../../../assets/images/home/banner/banner-fig01.png'

export default function Banner() {
  return (
        <div className="main_banner top_banner">
          <div className="bg_layer">
            <div className="custom-container-fluid">
                <div className="main_banner_row">
                    <div className="mian_banner_text">
                         <h2>Your Pet</h2>
                         <h1>Our Priority</h1>
                         <p>Welcome to PetSitting, where your furry family members become our top priority <br/>
                         Leave your pets in our loving care and enjoy peace of mind while you're away. <br/>
                         Discover compassionate pet sitting services.
                         </p> 
                        <ul className="banner_video">
                        <Link className="main_button btn2 hover-affect" to={`/about`} component={RouterLink}>Learn More</Link>
                        </ul>
                    </div>
                    <div className="banner_fig_slider">
                        <div>
                          <div className="mian_banner_fig">
                            <figure>
                               <img src={bannerImage1}/>
                           </figure>
                          </div>
                        </div>
                    </div>
                </div>        
            </div>
              <div id="divider_id" className="website-divider-container-500113">
                 <svg xmlns="http://www.w3.org/2000/svg" className="divider-img-500113" viewBox="0 0 1080 137" preserveAspectRatio="none">
                <path d="M 0,137 V 59.03716 c 158.97703,52.21241 257.17659,0.48065 375.35967,2.17167 118.18308,1.69101 168.54911,29.1665 243.12679,30.10771 C 693.06415,92.25775 855.93515,29.278599 1080,73.61449 V 137 Z" style={{opacity:0.85}}></path>
              </svg>   

              </div>
           </div> 
        </div>
  )
}
