import axios from "axios";
import { useEffect, useState } from "react";
import Countries from './components/Countries.js'

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('fulfilled')
      setCountryData(response.data)      
    })
  }, [])

  const countriesToShow = countryData.filter(country => country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const showCountry = event => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const handleClick = country => {
    setSearch(country)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} /> <br></br>
      <Countries search={search} countriesToShow={countriesToShow} showCountry={showCountry} handleClick={handleClick}/>
    </div>
  )
}

export default App;