import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import image from "./cryptomonedas.png";
import Form from "./components/Form";
import axios from "axios";
import Quotation from "./components/Quotation";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  // States
  const [coin, setCoin] = useState("");
  const [cryptocurrency, setCrypto] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect for quote
  useEffect(() => {
    // Not to run if empty
    if (coin === "") return;

    const quoteOnAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${coin}`;

      const result = await axios.get(url);

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setResult(result.data.DISPLAY[cryptocurrency][coin]);
      }, 3000);
    };
    quoteOnAPI();
  }, [coin, cryptocurrency]);

  const component = loading ? <Spinner /> : <Quotation result={result} />;

  return (
    <Contenedor>
      <div>
        <Image src={image} alt="Imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>

        <Form setCoin={setCoin} setCrypto={setCrypto} />

        {component}
      </div>
    </Contenedor>
  );
}

export default App;
