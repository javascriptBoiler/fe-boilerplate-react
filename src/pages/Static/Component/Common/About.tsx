import React from "react";
import { Link as RouterLink } from "react-router-dom";
import{  Link } from "@mui/material";

export default function About() {
  return (
    <>
      <section className="pet_about_wrap">
        <div className="custom-container">
          <div className="pet_about_row">
            <div className="pet_about_fig">
              <figure>
                <img src="images/about-fig.png" alt="image" />
              </figure>
            </div>
            <div className="pet_about_text">
              <h3>About Us</h3>
              <h2>
                We'll Make Your Pets
                <br />
                Really Awesome
              </h2>
              <p>
                PetSitting is the largest specialty pet retailer of services and
                solutions for the lifetime needs of pets. At PetSitting, we love
                pets, and we believe pets make us better people.
              </p>
              <Link className="main_button btn2 bdr-clr hover-affect" to={`/about`} component={RouterLink}>Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
