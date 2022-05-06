import React from 'react';
import Row from './Row';

const ROWS = 6;

function Grid() {
  return (
    <>
      {Array(ROWS)
        .fill(null)
        .map((_, index) => (
          <Row key={index} />
        ))}
    </>
  );
}

export default Grid;
