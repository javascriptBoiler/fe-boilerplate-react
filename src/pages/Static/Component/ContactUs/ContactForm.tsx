import React from 'react'

export default function ContactForm() {
  return (
    <>
      <section className="contact_wrapper">
        <div className="container" >
          <div className="mian_heading">
            <h2 className="">Send Us a Message</h2>
            <h3 className="">Feel free to contact</h3>
          </div>
          <div className="contact_row" style={{justifyContent:'center'}}>
            <div className="contact_form_column">
              <div className="contact_filed">
                <input type="type" name="text" placeholder="Name" />
                <input type="type" name="text" placeholder="Email" />
              </div>
              <div className="contact_filed full_width">
                <input type="type" name="text" placeholder="Subject" />
              </div>
              <div className="contact_filed">
                <input type="type" name="text" placeholder="Name" />
                <input type="type" name="text" placeholder="Email" />
              </div>
              <textarea>Message</textarea>
              <button className="main_button btn2 bdr-clr hover-affect">
                Send Message
              </button>
            </div>
            <div className="contact_form_column">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13606.386280231814!2d74.34701655!3d31.5077711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1680087992433!5m2!1sen!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
