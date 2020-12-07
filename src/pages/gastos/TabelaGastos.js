import React from 'react';
import api from '../../services/api';
import TabelaCompleta from '../../components/Tabela/TabelaCompleta';

const formatData = (value) => {
  const d = new Date(value);
  const day = ('0' + (d.getDate() + 1)).slice(-2);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  return `${day}/${month}/${d.getFullYear()}`;
}

const headCells = [
  { 
    id: 'descricao', 
    label: 'Descrição',
    minWidth: 400,
  },
  { 
    id: 'data', 
    label: 'Data',
    format: formatData
  },
  { 
    id: 'valor', 
    label: 'Valor', 
    format: (value) => "R$ " + value.toFixed(2), 
    align: 'right',
  },
];

export default function TabelaGastos ({ filtroMesSelecionado, refresh, setRefresh }) {
 
  const [gastos, setGastos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);
  
  async function handleDeleteGasto (gasto) {
    const url = `/gastos/${gasto.id}`;
    window.console.log("DELETE " + url);
    await api.delete(url);
    setRefresh();
  }

  React.useEffect(() => {
    setLoading(true);
    async function getGastosApi () {
      if (filtroMesSelecionado) {
        const [ano, mes] = filtroMesSelecionado.split("-");
        const url = `/gastos?ano=${ano}&mes=${mes}`;
        const response = await api.get(url);
        
        window.console.log("GET " + url);
        
        setGastos(response.data);
      }
    }
    getGastosApi();
  }, [filtroMesSelecionado, refresh]);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 100);
    setTotal(gastos.reduce((total, gasto) => total + gasto.valor, 0));
  }, [gastos]);

  return (
    <div className="tabela-gastos">

      {loading ? (<p>Carregando...</p>) : 
        (<TabelaCompleta 
          rows={gastos} 
          headCells={headCells} 
          titleTable={'Total: R$ ' + total.toFixed(2)}
          handleDeleteRow={handleDeleteGasto}
        />) }

    </div>
  );
}