import React, { useState } from 'react';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../services';

function planetsProvider({ children }) {
  const context = getPlanets();
  const [data, setData] = useState({ context });

  return (
    <PlanetsContext.Provider value={ data }>
      { children }
    </PlanetsContext.Provider>
  );
}
export default planetsProvider;
