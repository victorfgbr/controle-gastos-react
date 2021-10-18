import React from 'react';
import api from '../../services/api';

import TabelaCompleta from '../../components/Tabela/TabelaCompleta';

export default function TabelaGastos ({ gastos, refreshTableGastos }) {
 
  const [total, setTotal] = React.useState(0);
  
  const handleDeleteGasto = (gasto) =>  {
    api.delete(`/gastos/${gasto.id}`)
          .then((_) => refreshTableGastos())
          .catch((res) => alert(res));
  }

  React.useEffect(() => {
    setTotal(gastos.reduce((total, gasto) => total + gasto.valor, 0));
  }, [gastos]);

  return (
    <TabelaCompleta 
      rows={gastos} 
      headCells={headCells} 
      titleTable={'Total: R$ ' + total.toFixed(2)}
      handleDeleteRow={handleDeleteGasto}
    />
  );
}

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