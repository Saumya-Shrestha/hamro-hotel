import React from "react";
import SmallBanner from "../components/common/SmallBanner";
import ContactCard from "../components/cards/ContactCard";
import Form from "../components/contact/Form";
import Map from "../components/contact/Map";

const Contact = ({ mode }) => {
  return (
    <>
      <div className={`bg-${mode}`}>
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-easing="ease-out-cubic"
        >
          <SmallBanner
            title="Contact Us"
            mode={mode}
          />
        </div>
        <div className={`container-fluid px-5 my-5 text-${mode === "dark" ? "light" : "dark"} contact-padding`}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                data-aos-duration="1200"
                data-aos-easing="ease-out-cubic"
              >
                <h3 className="fs-2 fw-bold">Let's Connect!</h3>
                <p className={`text-${mode === "dark" ? "light" : "dark"} mb-4`}>
                  Your thoughts, questions, and feedback are what help us grow and improve. Whether you've encountered an issue, have a suggestion, or
                  just want to share your experience, we're here to listen. Reach out to us using the form below or through any of the other contact
                  methods provided. Let's make your luxury experience even better, together.
                </p>
              </div>
              <div className="mb-3">
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="1200"
                  data-aos-easing="ease-out-cubic"
                >
                  <ContactCard
                    mode={mode}
                    icon="at"
                    text="reservations@hamrohotel.com"
                  />
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="450"
                  data-aos-duration="1200"
                  data-aos-easing="ease-out-cubic"
                >
                  <ContactCard
                    mode={mode}
                    icon="phone"
                    text="+977 1 2345678"
                  />
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="600"
                  data-aos-duration="1200"
                  data-aos-easing="ease-out-cubic"
                >
                  <ContactCard
                    mode={mode}
                    icon="location-dot"
                    text="123 Durbar Marg, Kathmandu, Nepal"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                data-aos="fade-up"
                data-aos-delay="750"
                data-aos-duration="1200"
                data-aos-easing="ease-out-cubic"
              >
                <Form mode={mode} />
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid px-0">
          <div
            data-aos="fade-up"
            data-aos-delay="900"
            data-aos-duration="1200"
            data-aos-easing="ease-out-cubic"
          >
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
