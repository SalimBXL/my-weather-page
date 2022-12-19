import React from 'react';
import Fiche from "../Fiche";
import "./FicheTemperatures.css";

function FicheTemperatures({current, apparent}) {
  const contents = [
    { title: "current", text: current },
    { title: "apparent", text: apparent },
  ];
  return (
    <Fiche className="Fichetemperature"
      title="Temperatures"
      contents = {contents}
    />
  )
}

export default FicheTemperatures