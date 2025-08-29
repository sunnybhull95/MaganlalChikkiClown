import { useState } from "react";
import style from "./ContactUs.module.css";
import { IoClose } from "react-icons/io5";
import PathComponent from "../PathComponent/PathComponent";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim input values and store in localStorage
    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    localStorage.setItem("userContact", JSON.stringify(userData));

    // Show the success popup
    setShowPopup(true);

    // Clear the form fields
    setFormData({ name: "", email: "", message: "" });

    // Auto-hide popup after 5 second
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <>
      <div className={style.pDiv}>
       <PathComponent text="Contact Us"/>

        <form className={style.inpDiv} onSubmit={handleSubmit}>
          <p>Contact Form</p>
          <div className={style.flexDiv}>
            <input
              type="text"
              name="name"
              placeholder="Your name*"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength="30"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email*"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Your message*"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Us</button>
        </form>

        <p className={style.address}>Address</p>
        <div className={style.textDiv1}>
          <h5>Maganlal Chikki Products Pvt Ltd</h5>
          <p>
            Shed No. 49A & B, Opp. Monsento LICEL, Nangargaon, Lonavala 410401
            Dist. Pune
          </p>
          <p>
            Online store:-{" "}
            <a
              href="https://maganlalchikki.in/"
              target="blank"
              style={{ textDecoration: "none" }}
            >
              <span>www.maganlalchikki.in</span>
            </a>
          </p>
          <p>Ph. No. :- +912114274060 I Mobile No. :- +917666530969</p>
          <p>Contact Time :- 9 AM To 6 PM</p>
          <p>Factory Closed - Thursday</p>
          <p>
            <span>sales@maganlalchikki.in</span>
          </p>
        </div>
      </div>

      <div className={style.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60468.551443637196!2d73.48883932800291!3d18.696078358247863!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be8017890cc0399%3A0x125f023d78642c31!2sLICEL%20Office!5e0!3m2!1sen!2sin!4v1733139497939!5m2!1sen!2sin"
          width="100%"
          height="600"
          alt="img"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className={style.popup}>
          <div className={style.popupContent}>
            <button
              className={style.closeBtn}
              onClick={() => setShowPopup(false)}
            >
              <IoClose />
            </button>
            <h2>✅ Thank You!</h2>
            <p>Our team will contact you within</p>
            <p className={style.highlight}>10 to 30 minutes 🚀</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;
