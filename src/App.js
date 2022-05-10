import React from 'react';
import { BiSearchAlt } from 'react-icons/fa';
import './index.css';
import PlanetsProvider from './Context/PlanetsProvider';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsProvider>
      <Filters />
      <Table />
    </PlanetsProvider>

  );
}

export default App;
