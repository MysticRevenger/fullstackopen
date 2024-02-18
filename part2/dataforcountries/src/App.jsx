import React, { useEffect, useState } from 'react'
import axios from "axios"
import Filter from './components/Filter';
import Countries from './components/Countries';


const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
  }, [])

  const handleFilter = (e) => setFilter(e.target.value)

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Countries countries={countries} filteredValue={filter} />
    </div>
  )
}

export default App