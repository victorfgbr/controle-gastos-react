import React from 'react'
import IntlCurrencyInput from "react-intl-currency-input"
import api from '../../services/api';

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

const FormCadastroGasto = ({ refreshTableGastos }) => {

  const [gasto, setGasto] = React.useState({
    descricao: "",
    valor: 0.00,
    data: new Date().toISOString().slice(0, 10)
  });

  function handleChangeValor(event) {
    const valorString = event.target.value;
    var numb = valorString.match(/\d/g);

    if (numb) {
      numb = numb.join("");
      setGasto({ ...gasto, valor: (numb / 100) });
    }
    else
      setGasto({ ...gasto, valor: 0.00 });
  }

  function handleSubmit(event) {
    event.preventDefault();

    api.post('/gasto', JSON.stringify(gasto), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((_) => refreshTableGastos())
      .catch((res) => alert(res))
  }

  function handleChange(event) {
    const { id, value } = event.target;
    setGasto({ ...gasto, [id]: value });
  }

  return (
    <div className="form-gastos">
      <h3>Cadastro de gasto</h3>

      <div>
        <label htmlFor="descricao">Descrição</label>
        <input type="text" id="descricao" onChange={(event) => handleChange(event)}/>
      </div>
      
      <div>
        <label htmlFor="valor">Valor</label>
        <IntlCurrencyInput id="valor" currency="BRL" config={currencyConfig} onChange={handleChangeValor} />
      </div>
      
      <div>
        <label htmlFor="data">Data</label>
        <input type="date" id="data" value={gasto.data} onChange={(event) => handleChange(event)}/>
      </div>

      <input type="submit" value="Submit" onClick={handleSubmit}/>
    </div>
  );
}

export default FormCadastroGasto
