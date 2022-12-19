import React from 'react';
import Badge from 'react-bootstrap/Badge';

import Fiche from "../Fiche";
import "./FicheWeatherCode.css";

function FicheWeatherCode({code, icone, text, update, sunrise, sunset}) {
  const contents = [
    { title: "Sunrise", text: <Badge bg="info">{sunrise}</Badge>},
    { title: "Sunset", text: <Badge bg="danger">{sunset}</Badge> },
    { title: "update", text: <Badge bg="secondary">{update}</Badge> },
  ];
  return (
    <Fiche className="FicheWeatherCode"
      title={text}
      subtitle={`(WMO:${code})`}
      contents = {contents}
      image = {icone}
    />
  )
}

export default FicheWeatherCode;