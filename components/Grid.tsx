import React from 'react';
import { FormattedGuess } from '../hooks/useWordle';
import Row from './Row';

function Grid({ guesses }: { guesses: FormattedGuess[] }) {
  return (
    <>
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess} />
      ))}
    </>
  );
}

export default Grid;
