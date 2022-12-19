import React from 'react';
import Fiche from "../Fiche";
import "./FicheWinds.css";

function FicheWinds({speed, direction, pressure}) {
  const contents = [
    { title: "Speed", text: speed },
    { title: "Direction", text: direction },
    { title: "Pressure", text: pressure },
  ];
  return (
    <Fiche className="FicheWinds"
      title="Winds"
      contents = {contents}
    />
  )
}

export default FicheWinds;