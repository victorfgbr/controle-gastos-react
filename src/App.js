import React from 'react';

import Header from './components/Header';
import PaginaGastos from './pages/gastos/PaginaGastos'

export default function App() {

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        <PaginaGastos />
      </div>

    </div>
  );
}
