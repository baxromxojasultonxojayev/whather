import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
const api = {
  key: "af6ccddfe6dab477789f2a37b057780b",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const cities = ["Tashkent", "Samarqand", "Buxoro", "Jizzax"];

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const searchInput = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const clickCity = (e, id) => {
    console.log(id);
    console.log(e.target.innerHTML);

    if (e.target.innerHTML) {
      fetch(
        `${api.baseUrl}weather?q=${e.target.innerHTML}&units=metric&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (s) => {
    let months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ];
    let days = [
      "Yakshanba",
      "Dushanba",
      "Seshanba",
      "Chorshanba",
      "Juma",
      "Payshanba",
      "Shanba",
    ];

    let day = days[s.getDay()];
    let time = new Date().toLocaleString();
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `${day}, ${date}, ${time},`;
  };

  return (
    <div
      className={
        weather.main && weather.main?.temp > 19
          ? "weather-app "
          : "weather-app cold"
      }
    >
      <div className="container">
        <h3 className="brand">The Weather</h3>
        <div>
          <h1 className="temp">
            {weather?.main ? Math.round(weather?.main?.temp) : "0"}&#176;
          </h1>
          <div className="city-time">
            <h1 className="name">{weather.name ? weather.name : "City"}</h1>
            <small>
              {/* <span className="time">{new Date()}</span>- */}
              <span className="date">{dateBuilder(new Date())}</span>
            </small>
          </div>
          <div className="weather">
            <img
              src={
                weather.main && weather.main?.temp > 19
                  ? require("./images/icons/113.png")
                  : require("./images/icons/122.png")
              }
              alt="icon"
            />
            <span className="condition">
              {weather.weather && weather?.weather[0]?.main}
            </span>
          </div>
        </div>
      </div>
      <div className="panel">
        <input
          type="text"
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location ...."
          onKeyPress={searchInput}
        />
        <button onClick={searchInput}>
          <FaSearch />
        </button>
        <ul className="cities">
          {cities.map((city, index) => (
            <li
              onClick={(e) => clickCity(e, index)}
              className="city"
              key={index}
            >
              {city}
            </li>
          ))}
        </ul>

        {/* ///Details */}

        <ul className="details">
          <h4>Whather details</h4>
          <li>
            <span>Cloudy</span>
            <span className="cloud">
              {weather.clouds ? weather.clouds?.all : 0}%
            </span>
          </li>
          <li>
            <span>Humidity</span>
            <span className="cloud">
              {weather.main ? weather.main?.humidity : "0"}%
            </span>
          </li>
          <li>
            <span>Wind</span>
            <span className="cloud">
              {weather.wind ? weather.wind?.speed : 0}km/h
            </span>
          </li>
          <li>
            <span>Rain</span>
            <span className="cloud">
              {weather.rain ? weather.rain["1h"] : 0}mm
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
