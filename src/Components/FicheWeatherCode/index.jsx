import React from 'react';
import Badge from 'react-bootstrap/Badge';

import Fiche from "../Fiche";
import "./FicheWeatherCode.css";

function FicheWeatherCode({code, icone, text, update, sunrise, sunset, currentTemperature, highTemp, lowTemp}) {
  const contents = [
    { title: "Sunrise", text: <Badge bg="info">{sunrise}</Badge>},
    { title: "Sunset", text: <Badge bg="danger">{sunset}</Badge> },
    { title: "update", text: <Badge bg="secondary">{update}</Badge> },
  ];
  return (
    <div className="FicheWeatherCode"
      title={text}
      subtitle={`(WMO:${code})`}
      contents = {contents}
      image = {icone}
    >
      <h1>{currentTemperature}</h1>
      <h4>{text}</h4>
      <h5>H:{highTemp} &nbsp; L:{lowTemp}</h5>
    </div>
  )
}

export default FicheWeatherCode;