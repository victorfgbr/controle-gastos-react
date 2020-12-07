import React from 'react'

import TabelaGastos from './TabelaGastos';
import FormCadastroGasto from './FormCadastroGasto';
import FiltroMes from './FiltroMes';
import './style.css';

const PaginaGastos = () => {

  const [filtroMesSelecionado, setFiltroMesSelecionado] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);

  function refreshTableGastos () {
    setRefresh(!refresh);
  }

  return (
    <div className="pagina-gastos">
        <FiltroMes setFiltroMesSelecionado={setFiltroMesSelecionado} />
        <div className="container-form-tabela">
            <FormCadastroGasto refreshTableGastos={refreshTableGastos} />
            <TabelaGastos 
              filtroMesSelecionado={filtroMesSelecionado} 
              refresh={refresh} 
              setRefresh={refreshTableGastos} />
        </div>
    </div>
  )
}

export default PaginaGastos
