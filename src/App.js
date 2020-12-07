import React from 'react';

import Header from './components/Header';
import PaginaGastos from './pages/gastos/PaginaGastos'

function App() {
  return (
    <div className="App">
      <Header />
      
      <div className="container">
        <PaginaGastos />
      </div>

    </div>
  );
}

export default App;
