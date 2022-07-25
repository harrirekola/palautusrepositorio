import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({ country }) => {
  const [weather, setWeatherData] = useState({
    'temperature': null,
    'wind': null
  })
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(
    () => {
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`)
        .then(response => setWeatherData({
          'temperature': response.data.main.temp,
          'wind': response.data.wind.speed
        }))
  }, [])
  console.log(weather)
  const languages = country.languages
  const flag = country.flags.png
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
      {
        Object.keys(languages).map(
          key => <li key={key}>{languages[key]}</li>
        )
      }
      </ul>
      <img src={flag} />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.temperature} celsius</p>
      <p>wind {weather.wind} m/s</p>
    </div>
  )
}

export default Country