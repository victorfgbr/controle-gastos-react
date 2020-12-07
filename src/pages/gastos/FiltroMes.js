import React from 'react'
import api from '../../services/api';

const FiltroMes = ({ setFiltroMesSelecionado }) => {

  const [meses, setMeses] = React.useState([]);

  React.useEffect(() => {
    async function getMesesApi () {
      const response = await api.get(`/filtros/meses`);
      setMeses(response.data);
    }
    getMesesApi();
  }, []);

  React.useEffect(() => {
    const codigoMesSelecioando = meses[0];
    if (codigoMesSelecioando)
    setFiltroMesSelecionado(codigoMesSelecioando.valor);
  }, [meses, setFiltroMesSelecionado]);

  const handleChangeMes = (event) => setFiltroMesSelecionado(event.target.value);

  return (
    <div className="filtro-mes">
        <label htmlFor="select-mes">Gastos de&nbsp;</label>
        <select id="select-mes" onChange={handleChangeMes}>
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
