import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [filteredByName, setFilteredByName] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  // referencia retirada de https://www.codegrepper.com/code-examples/javascript/find+add+or+remove+react-select
  const initialFilterColumns = [
    { value: 'population', label: 'Population' },
    { value: 'orbital_period', label: 'Orbital Period' },
    { value: 'diameter', label: 'Diameter' },
    { value: 'rotation_period', label: 'Rotation Period' },
    { value: 'surface_water', label: 'Surface Water' },
  ];
  const [filterByNumericValues,
    setFilterByNumericValues,
  ] = useState(initialFilterColumns);

  useEffect(() => {
    const URL_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getPlanets = async () => {
      const { results } = await fetch(URL_PLANETS).then((response) => response.json());
      // referencia retirada de stackoverflow no link: https://stackoverflow.com/questions/18133635/remove-property-for-all-objects-in-array
      results.forEach((planet) => delete planet.residents);
      setData(results);
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
        { data,
          setData,
          input,
          setInput,
          filteredByName,
          setFilteredByName,
          columnFilter,
          setColumnFilter,
          comparisonFilter,
          setComparisonFilter,
          valueFilter,
          setValueFilter,
          filterByNumericValues,
          setFilterByNumericValues }
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
