import React from 'react'

export default function Activities() {
  return (
    <>
      <section className="pet_exercise_wrap">
            <div className="custom-container">
              <div className="pet_exercise_row">
                <div className="pet_exercise_fig">
                    <figure>
                      <img src="images/exercise-fig.png" alt=""/>
                    </figure>
                </div>
                <div className="pet_exercise_text">
                  <h3>Activities and Exercise</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                  <ul className="pet_service_list">
                    <li>
                      <figure>
                         <img src="images/exercise-list-fig.png" alt=""/>
                        <span>01</span>
                      </figure>
                      <div className="pet_exercise_list_text">
                        <h5>Play fetch and chase games</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                      </div>
                    </li>
                    <li>
                      <figure>
                         <img src="images/exercise-list-fig.png" alt=""/>
                        <span>02</span>
                      </figure>
                      <div className="pet_exercise_list_text">
                        <h5>Follow them for a stroll</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                      </div>
                    </li>
                    <li>
                       <figure>
                         <img src="images/exercise-list-fig.png" alt=""/>
                        <span>03</span>
                      </figure>
                      <div className="pet_exercise_list_text">
                        <h5>Obedience training</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                      </div>
                    </li>
                    <li>
                       <figure>
                         <img src="images/exercise-list-fig.png" alt=""/>
                        <span>04</span>
                      </figure>
                      <div className="pet_exercise_list_text">
                        <h5>Make them climb the stairs</h5>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                      </div>
                    </li>
                    <li>
                      <a className="main_button btn2 bdr-clr hover-affect" href="#">Book Appointment</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> 
        </section>
    </>
  )
}
