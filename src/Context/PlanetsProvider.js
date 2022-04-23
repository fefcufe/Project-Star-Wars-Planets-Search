import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  // const context = getPlanets();
  const [data, setData] = useState([]);

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

  return (
    <PlanetsContext.Provider value={ { data, setData } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetsProvider;
