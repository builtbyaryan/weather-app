import { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");

  const search = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log("Can't run the code:", error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    if (city.trim() !== "") {
      search(city);
    }
  };

  return (
    <div className="weather">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="search-button">
          <img src={search_icon} alt="search" />
        </button>
      </form>

      {weatherData && (
        <>
          <img src={clear_icon} alt="" className="weather-icon" />
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="location">{weatherData.name}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="Wind" />
              <div>
                <p>{weatherData.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
