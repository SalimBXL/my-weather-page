import React from 'react';
import Fiche from "../Fiche";
import "./FichePrecipitations.css";

function FichePrecipitations({rain, showers, snowfall, humidity}) {
  const contents = [
    { title: "Rain", text: rain },
    { title: "Showers", text: showers },
    { title: "Snow Fall", text: snowfall },
    { title: "Humidity", text: humidity}, 
  ];
  return (
    <Fiche className="FichePrecipitations"
      title="Precipitations"
      contents = {contents}
    />
  )
}

export default FichePrecipitations;