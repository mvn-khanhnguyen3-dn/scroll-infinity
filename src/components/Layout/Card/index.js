import React, { useEffect } from "react";

const Card = ({ item, index }) => {
  useEffect(() => {
    const item = document.querySelectorAll(".card-content");
    if (index % 2 !== 0) {
      item[index].classList.add("clip-path");
    }
  }, [index]);

  return (
    <li className="card-item">
      <div
        style={{ backgroundImage: `url(${item.avatar})` }}
        className="avatar-bg bg-color"
      ></div>
      <div className="card-content">
        <div
          style={{ backgroundImage: `url(${item.avatar})` }}
          className="avatar-bg sm"
        ></div>
        <div className="card-desc">
          <h3 className="card_name">
            {`${item.first_name} ${item.last_name}`}
          </h3>
          <p className="card_email">{item.email}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
