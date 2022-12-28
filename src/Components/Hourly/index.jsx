import React from 'react'
import Card from 'react-bootstrap/Card';
import "./Hourly.css";

function Hourly({temperatures, tempUnit, currentHour, weatherCodes, humidities, humidityUnit}) {
    currentHour = Number(currentHour);
    return (
        <Card className='Hourly'>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Hourly</Card.Subtitle>
                <div className='Hourly-temperatures'>
                    {temperatures.map((temperature, hour) => {
                        const now = (currentHour + hour);
                        const nowTemp = Math.round(temperature);
                        const nowWeatherCode = weatherCodes[hour];
                        const humidity = humidities[hour];
                        return (
                            <div className='Hourly-temperature'>
                                {now}h  {nowWeatherCode}  {humidity}{humidityUnit}  {nowTemp}{tempUnit}
                            </div>
                        )
                    })}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Hourly