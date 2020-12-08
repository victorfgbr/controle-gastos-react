import React from 'react'
import api from '../../services/api';

const FiltroMes = ({ setMesSelecionado, usuario }) => {

  const [meses, setMeses] = React.useState([]);

  React.useEffect(() => {
    
    api.get(`/filtros/meses`)
      .then((response) => setMeses(response.data));

  }, [usuario]);

  React.useEffect(() => {

    const codigoMesSelecioando = meses[0];
    if (codigoMesSelecioando)
      setMesSelecionado(codigoMesSelecioando.valor);

  }, [meses, setMesSelecionado]);

  return (
    <div className="filtro-mes">
        <label htmlFor="select-mes">Gastos de&nbsp;</label>
        <select id="select-mes" 
          onChange={({ target }) => setMesSelecionado(target.value)}>
          {meses.map(({ valor, nome }) => {
            return (
              <option key={valor} value={valor}>{nome}</option>
            );
          })}
        </select>
    </div>
  )
}

export default FiltroMes
