import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  // const context = getPlanets();
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [filteredByName, setFilteredByName] = useState([]);

  useEffect(() => {
    const URL_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getPlanets = async () => {
      const { results } = await fetch(URL_PLANETS).then((response) => response.json());
      // referencia retirada de stackoverflow no link: https://stackoverflow.com/questions/18133635/remove-property-for-all-objects-in-array
      results.forEach((planet) => delete planet.residents);
      setData(results);
      // console.log(results);
    };
    getPlanets();
  }, []);

  // referencia para a filtragem de data retirada de https://www.freecodecamp.org/news/build-a-search-filter-using-react-and-react-hooks/
  useEffect(() => {
    if (input !== '') {
      const filteredData = data.filter(({ name }) => name.toLowerCase()
        .includes(input.toLowerCase()));
      setFilteredByName(filteredData);
    } else {
      setFilteredByName(data);
    }
  }, [input, data]);

  return (
    <PlanetsContext.Provider
      value={
        { data, setData, input, setInput, filteredByName, setFilteredByName }
      }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetsProvider;
