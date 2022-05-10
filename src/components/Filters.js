import React, { useContext } from 'react';
import gif from '../images/title.gif';
import PlanetsContext from '../Context/PlanetsContext';
import './FiltersStyle.css';

function Filters() {
  const { input, setInput, columnFilter, setColumnFilter,
    comparisonFilter, setComparisonFilter, valueFilter,
    setValueFilter, filteredByName, setFilteredByName,
    filterByNumericValues,
    setFilterByNumericValues, usedFilters,
    setUsedFilters } = useContext(PlanetsContext);

  const handleUsedFilters = (column, comparison, value) => {
    const renderFilter = {
      column,
      comparison,
      value,
    };
    setUsedFilters([...usedFilters, renderFilter]);
  };

  const handleX = (remColumn) => {
    const updatedUsedFilters = usedFilters.filter(({ column }) => column !== remColumn);
    setUsedFilters(updatedUsedFilters);
    setFilterByNumericValues([...filterByNumericValues,
      { value: remColumn, label: remColumn.toUpperCase() }]);
  };

  const removeFilter = (column) => {
    const updatedFilters = filterByNumericValues.filter(({ value }) => column !== value);
    setFilterByNumericValues(updatedFilters);
  };

  const handleFilters = () => {
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
        .filter((planeta) => (Number(planeta[columnFilter]) === Number(valueFilter)));
      setFilteredByName(twoFiltersPlanets);
    }

    removeFilter(columnFilter);
    handleUsedFilters(columnFilter, comparisonFilter, valueFilter);
  };

  return (
    <>
      <div className='title-container'>
        <img src={ gif } alt="starWars-gif"/>
      </div>
      
      <div className="search-container">
        <div className="search-wrapper">
          <div id="cover">
            <form method="get" action="">
              <div className="tb">
                <div className="td">
                  <input
                    id="name_filter"
                    placeholder="Busque um planeta"
                    type="text"
                    data-testid="name-filter"
                    value={ input }
                    onChange={ (e) => setInput(e.target.value) }
                    required
                  />
                </div>
                <div className="td" id="s-cover">
                  <button type="button" id="search-name">
                    <div id="s-circle"></div>
                    <span></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      

    <div className="filters-container">
        <label htmlFor="column_filter">
          <select
            id="column_filter"
            data-testid="column-filter"
            value={ columnFilter }
            onChange={ (e) => setColumnFilter(e.target.value) }
          >
            { filterByNumericValues.map((option) => (
              <option
                key={ option.label }
                value={ option.value }
              >
                { option.value }
              </option>)) }
          </select>
        </label>

        <label htmlFor="comparison_filter">
          <select
            id="comparison_filter"
            data-testid="comparison-filter"
            value={ comparisonFilter }
            onChange={ (e) => setComparisonFilter(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value_filter">
          <input
            data-testid="value-filter"
            type="number"
            value={ valueFilter }
            onChange={ (e) => setValueFilter(e.target.value) }
          />
        </label>

        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => handleFilters() }
        >
          Filtrar
        </button>
        
    </div>

      <ul>
        { usedFilters.map(({ column, comparison, value }, index) => (
          <li
            key={ index }
            data-testid="filter"
            value={ column }
          >
            { `${column} ${comparison} ${value}` }
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ () => handleX(column) }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Filters;
