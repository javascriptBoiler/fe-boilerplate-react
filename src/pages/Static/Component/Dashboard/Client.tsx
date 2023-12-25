import React from 'react'

export default function Client() {
  return (
    <>
      <section className="pet_client_wrap">
          <div className="custom-container">
            <div className="pet_client_row">
                <div className="pet_client_fig">
                   <figure>
                    <img src="images/client-text-fig.png" alt=""/>
                       <h2 className="pet_clien_text">what <br/>our client say <br/> about us</h2>
                  </figure>
                </div>
                <div className="pet_client_list">
                  <div className="mian_heading">
                    <h2 className="clr_white">Our Services</h2>
                    <h3 className="clr_white">What Our Client Say</h3>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                 <div className="pet_client_detail">
                    <figure>
                      <img src="images/client-fig.png" alt=""/>
                    </figure>
                    <div className="pet_client_detail_text">
                      <h6>Wesley Delgado</h6>
                      <h6 className="clr_white">Pet lover</h6>
                    </div>
                 </div> 
               </div>
                <div id="modal-box">
                  <span className="close">&times;</span>
                  <img id="modal-image" src=""/>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}
