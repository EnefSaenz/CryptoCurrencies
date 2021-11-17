import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ResultDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

const Paragraph = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;

const Price = styled.p`
  font-size: 30px;

  span {
    font-weight: bold;
  }
`;

const Quotation = ({ result }) => {
  if (Object.keys(result).length === 0) return null;
  return (
    <ResultDiv>
      <Price>
        Precio actual: <span>{result.PRICE}</span>
      </Price>
      <Paragraph>
        Precio más alto del día: <span>{result.HIGHDAY}</span>
      </Paragraph>
      <Paragraph>
        Precio más bajo del día: <span>{result.LOWDAY}</span>
      </Paragraph>
      <Paragraph>
        Cambio últimas 24h: <span>{result.CHANGEPCT24HOUR}</span>
      </Paragraph>
      <Paragraph>
        Última actualización: <span>{result.LASTUPDATE}</span>
      </Paragraph>
    </ResultDiv>
  );
};

Quotation.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Quotation;
