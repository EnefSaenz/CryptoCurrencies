import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useCoin from "../hooks/useCoin";
import useCriptocurrency from "../hooks/useCryptocurrency";
import axios from "axios";
import Error from "./Error";
import PropTypes from "prop-types";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Form = ({ setCoin, setCrypto }) => {
  // State crypto list
  const [listCryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const COINS = [
    { code: "USD", name: "Dolár de Estados Unidos" },
    { code: "MXN", name: "Peso Mexicano" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Libra Esterlina" },
  ];

  // Hook Coin
  const [coin, SelectCoins] = useCoin("Elige tu moneda", "", COINS);

  // Hook Crypto
  const [cryptocurrency, SelectCrypto] = useCriptocurrency(
    "Elige tu criptomoneda",
    "",
    listCryptos
  );

  // Execute call to API
  useEffect(() => {
    const callAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const result = await axios.get(url);

      setCryptos(result.data.Data);
    };
    callAPI();
  }, []);

  // On Submit
  const quoteCoin = (e) => {
    e.preventDefault();

    // Validate fields
    if (coin === "" || cryptocurrency === "") {
      setError(true);
      return;
    }

    // Pass to main component
    setError(false);
    setCoin(coin);
    setCrypto(cryptocurrency);
  };

  return (
    <form onSubmit={quoteCoin}>
      {error ? <Error message="Todos los campos son obligatorios" /> : null}
      <SelectCoins />
      <SelectCrypto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

Form.propTypes = {
  setCoin: PropTypes.func.isRequired,
  setCrypto: PropTypes.func.isRequired,
};

export default Form;
