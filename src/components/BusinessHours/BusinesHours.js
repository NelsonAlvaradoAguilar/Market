import React from "react";
import "./BusinesHours.scss";

const BusinessHours = ({ workingHours }) => (
  <div className="business-hours">
    <h3 className="business-hours__title">Business Hours</h3>
    <ul className="business-hours__ul">
      {workingHours.map((item, index) => (
        <li className="business-hours__li" key={index}>
          <span className="business-hours__day">{item.day}</span>
          <span className="business-hours__time"> {item.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default BusinessHours;
