import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

function Filters() {
  const { input, setInput, columnFilter, setColumnFilter,
    comparisonFilter, setComparisonFilter, valueFilter,
    setValueFilter, filteredByName, setFilteredByName } = useContext(PlanetsContext);

  const addFilters = () => {
    if (comparisonFilter === 'maior que') {
      const twoFiltersPlanets = filteredByName
        .filter((planeta) => (Number(planeta[columnFilter]) > Number(valueFilter)));
      setFilteredByName(twoFiltersPlanets);
    }

    if (comparisonFilter === 'menor que') {
      const twoFiltersPlanets = filteredByName
        .filter((planeta) => (Number(planeta[columnFilter]) < Number(valueFilter)));
      setFilteredByName(twoFiltersPlanets);
    }

    if (comparisonFilter === 'igual a') {
      const twoFiltersPlanets = filteredByName
        .filter((planeta) => (Number(planeta[columnFilter]) < Number(valueFilter)));
      setFilteredByName(twoFiltersPlanets);
    }
  };

  return (
    <>
      <h1> StarWars Planets Search </h1>
      <input
        placeholder="Busque um planeta"
        type="text"
        data-testid="name-filter"
        value={ input }
        onChange={ (e) => setInput(e.target.value) }
      />

      <div>
        <select
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ (e) => setColumnFilter(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          value={ comparisonFilter }
          onChange={ (e) => setComparisonFilter(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          type="number"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />

        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => addFilters() }
        >
          Filtrar
        </button>
      </div>
    </>
  );
}

export default Filters;
