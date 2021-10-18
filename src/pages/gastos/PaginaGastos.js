import React from 'react'
import api from '../../services/api';

import Carregando from '../../components/Carregando';
import TabelaGastos from './TabelaGastos';
import FormCadastroGasto from './FormCadastroGasto';
import FiltroMes from './FiltroMes';
import './style.css';

export default function PaginaGastos () {

  const [loading, setLoading] = React.useState(true);
  const [gastos, setGastos] = React.useState([]);
  const [data, setData] = React.useState(null);

  React.useEffect(refreshGastos, [data]);

  function refreshGastos () {
    setLoading(true);

    let url = `/gastos`;

    if (data) {
      const [ano, mes] = data.split("-");
      url += `?ano=${ano}&mes=${mes}`;
    }

    api.get(url)
      .then(response => { 
        setGastos(response.data);
        setTimeout(() => setLoading(false), 200);
      });
  }

  return (
    <div className="pagina-gastos">
        <FiltroMes setMesSelecionado={setData} />

        {loading ? (<Carregando />) : 
            ( 
            <div className="container-form-tabela">
                <TabelaGastos gastos={gastos} refreshTableGastos={refreshGastos}/>
                <FormCadastroGasto refreshTableGastos={refreshGastos} />
            </div> ) }



    </div>
  );
}
