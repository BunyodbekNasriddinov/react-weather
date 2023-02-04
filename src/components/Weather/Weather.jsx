import axios from "axios";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { icons } from "./icons";

export const Weather = () => {
  const apiKey = "617db3e10040f791ff67c0d7b2d8f6be";
  const [weather, setWeather] = useState([]);
  const [searchVal, setSearchValue] = useState("Tashkent");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState("");
  let inputValue = useRef();

  const getWeather = async () => {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${apiKey}&units=metric`
    );

    if (data.status === 200) {
      setWeather(await data.data);

      icons.map((icon) =>
        icon.text == data.data?.weather[0]?.description ? setIcon(icon.img) : ""
      );
      setStatus(weather.weather[0]?.description);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setSearchValue(inputValue.current.value);
  };

  // console.log(weather.weather[0].icon);

  useEffect(() => {
    getWeather();
  }, [apiKey, searchVal]);

  return (
    <div className="container">
      <div className="my-5 w-50 mx-auto">
        <form onSubmit={(evt) => handleSubmit(evt)}>
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              ref={inputValue}
              placeholder="Search..."
            />
            <button className="btn btn-primary" type="submit">
              SEACH
            </button>
          </div>
        </form>
        <div className="d-flex my-5 p-3 shadow shadow-5 bg-white rounded">
          <img width="150" height="100%" src={icon} alt={weather.name} />
          <div className="fs-3">
            {weather.main?.temp} C <sup>o</sup> | F <sup>o</sup>
            <ul className="list-unstyled m-0 ms-2">
              <li className="fs-6">
                Precipitation: {weather.main?.pressure} %
              </li>
              <li className="fs-6">Wind: {weather.wind?.speed} km/h</li>
              <li className="fs-6">
                Visibility: {weather?.visibility / 1000} km
              </li>
              <li className="fs-6">
                <i className="fs-6 fa-solid fa-droplet-degree"></i>
                Humidity: {weather.main?.humidity} %
              </li>
            </ul>
            <p className="fs-5 ms-2">{status}</p>
          </div>
          <div className="ms-auto">
            <h2 className="display-6">{weather?.name}</h2>
            <p>{weather?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
