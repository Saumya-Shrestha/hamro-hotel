import React from "react";
import b1 from "../../assets/room/room-b1.jpg";
import b2 from "../../assets/room/room-b2.jpg";
import b3 from "../../assets/room/room-b3.jpg";
import b4 from "../../assets/room/room-b4.jpg";

const Room = ({ mode }) => {
  const rooms = [
    {
      image: b1,
      title: "Double Room",
      price: 199,
      size: "30 ft",
      capacity: "Max persion 5",
      bed: "King Beds",
      services: "Wifi, Television, Bathroom",
    },
    {
      image: b2,
      title: "Premium King Room",
      price: 159,
      size: "30 ft",
      capacity: "Max persion 5",
      bed: "King Beds",
      services: "Wifi, Television, Bathroom",
    },
    {
      image: b3,
      title: "Deluxe Room",
      price: 198,
      size: "30 ft",
      capacity: "Max persion 5",
      bed: "King Beds",
      services: "Wifi, Television, Bathroom",
    },
    {
      image: b4,
      title: "Family Room",
      price: 299,
      size: "30 ft",
      capacity: "Max persion 5",
      bed: "King Beds",
      services: "Wifi, Television, Bathroom",
    },
  ];

  return (
    <>
      <div className={`bg-${mode} pt-5`}>
        <div className="container-fluid pt-5">
          <div className="hp-room-items">
            <div className="row">
              {rooms.map((room, index) => (
                <div
                  className="col-lg-3"
                  key={index}
                >
                  <div className={`hp-room-item ${mode === "dark" ? "dark-room" : ""}`}>
                    <img
                      src={room.image}
                      alt={room.title}
                    />
                    <div className={`hr-text ${mode === "dark" ? "dark-room-text" : ""}`}>
                      <h3>{room.title}</h3>
                      <h2>
                        {room.price}$<span>/night</span>
                      </h2>
                      <table>
                        <tbody>
                          <tr>
                            <td className="r-o">Size:</td>
                            <td>{room.size}</td>
                          </tr>
                          <tr>
                            <td className="r-o">Capacity:</td>
                            <td>{room.capacity}</td>
                          </tr>
                          <tr>
                            <td className="r-o">Bed:</td>
                            <td>{room.bed}</td>
                          </tr>
                          <tr>
                            <td className="r-o">Services:</td>
                            <td>{room.services}</td>
                          </tr>
                        </tbody>
                      </table>
                      <button className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"}`}>Read More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
