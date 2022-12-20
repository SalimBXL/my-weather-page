import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FicheWeatherCode from './Components/FicheWeatherCode';
import FicheTemperatures from './Components/FicheTemperatures';
import FicheWinds from './Components/FicheWinds';
import FichePrecipitations from './Components/FichePrecipitations';
import Hourly from './Components/Hourly';
import Spinner from 'react-bootstrap/Spinner';
import useAxios from 'axios-hooks'
import logo from './logo.svg';
import './App.css';

import Card from 'react-bootstrap/Card';

const WMO = {
  0: "Clear Sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle : light intensity",
  53: "Drizzle : moderate intensity",
  55: "Drizzle : dense intensity",
  56: "Freezing Drizzle : light intensity",
  57: "Freezing Drizzle : dense intensity",
  61: "Rain : slight intensity",
  63: "Rain : moderate intensity",
  65: "Rain : heavy intensity",
  66: "Freezing Rain : light intensity",
  67: "Freezing Rain : heavy intensity",
  71: "Snow Fall : slight intensity",
  73: "Snow Fall : moderate intensity",
  75: "Snow Fall : intense intensity",
  77: "Snow grains",
  80: "Rain Showers: slight",
  81: "Rain Showers: moderate",
  82: "Rain Showers: violent",
  85: "Snow showers : slight",
  86: "Snow Showers : heavy",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight",
  99: "Thunderstorm with heavy hail",
};


function App() {
  
  const today = new Date().toISOString().slice(0,10);
  const baseURL = `https://api.open-meteo.com/v1/forecast?latitude=50.80&longitude=4.34&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,showers,snowfall,weathercode,surface_pressure,windspeed_10m,winddirection_10m&daily=sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin&start_date=${today}&end_date=${today}`;
  const [{ data, loading, error }, refetch] = useAxios(baseURL);

  if (loading) return (
    <div>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      &nbsp;Loading from <p>{baseURL}</p>
    </div>
  );

  if (error) return <p>Error!</p>


  console.log(data);

  const currentHour = data.current_weather.time.toString().substr(-5, 2)

  // WEATHER CODE
  const weather = {
    code: `${data.current_weather.weathercode}`,
    text: `${WMO[data.current_weather.weathercode]}`,
    icone: `${WMO[data.current_weather.weathercode]}`,
    update: `${data.current_weather.time.toString().substr(-5)}`
  }
  const hourlyWeatherCodes = data.hourly.weathercode.slice(currentHour);


  // TEMP
  const currentTemp = `${data.current_weather.temperature} ${data.hourly_units.apparent_temperature}`;
  const apparentTemp = `${data.hourly.apparent_temperature[currentHour]} ${data.hourly_units.apparent_temperature}`
  const highTemp = `${Math.max(...data.hourly.temperature_2m)} ${data.hourly_units.apparent_temperature}`
  const lowTemp = `${Math.min(...data.hourly.temperature_2m)} ${data.hourly_units.apparent_temperature}`
  const hourlyTemp = data.hourly.temperature_2m.slice(Number(currentHour));
  const hourlyTempUnit = data.hourly_units.temperature_2m;
  

  // WIND
  const wind = {
    speed: `${data.current_weather.windspeed} ${data.hourly_units.windspeed_10m}`,
    direction: `${data.current_weather.winddirection} ${data.hourly_units.winddirection_10m}`,
    pressure: `${data.hourly.surface_pressure[currentHour]} ${data.hourly_units.surface_pressure}`
  }

  // PRECIPITATIONS
  const precipitation = {
    rain: `${data.hourly.rain[currentHour]} ${data.hourly_units.rain}`,
    showers: `${data.hourly.showers[currentHour]} ${data.hourly_units.showers}`,
    snowfall: `${data.hourly.snowfall[currentHour]} ${data.hourly_units.snowfall}`,
    humidity: `${data.hourly.relativehumidity_2m[currentHour]} ${data.hourly_units.relativehumidity_2m}`,
  };
  const hourlyHumidity = data.hourly.relativehumidity_2m.slice(currentHour);
  const humidityUnit = data.hourly_units.relativehumidity_2m;


  // SUNRISE & SUNSET
  const day = {
    sunrise: `${data.daily.sunrise[0].substr(-5)}`,
    sunset: `${data.daily.sunset[0].substr(-5)}`,
  };

  return (
    <Card className="App">
      <Row xs={1} md={2} className="g-4">  
        <Col md={12}>
          <FicheWeatherCode
            code={weather.code}
            text={weather.text}
            icone={weather.icone}
            update={weather.update}
            sunrise={day.sunrise}
            sunset={day.sunset}
            currentTemperature={currentTemp}
            highTemp={highTemp}
            lowTemp={lowTemp}
          />
        </Col>

        <Col>
          <Hourly 
            temperatures={hourlyTemp} 
            weatherCodes={hourlyWeatherCodes}
            humidities={hourlyHumidity}
            tempUnit={hourlyTempUnit} 
            currentHour={currentHour}
            humidityUnit={humidityUnit}
          />
        </Col>

        <Col>
        <FicheTemperatures 
          current = {currentTemp} 
          apparent = {apparentTemp}
        />
        </Col>

        <Col>
          <FicheWinds
            speed = {wind.speed}
            direction = {wind.direction}
            pressure = {wind.pressure}
          />
        </Col>

        <Col>
          <FichePrecipitations 
            rain={precipitation.rain}
            showers={precipitation.showers}
            snowfall={precipitation.snowfall}
            humidity={precipitation.humidity}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default App;
