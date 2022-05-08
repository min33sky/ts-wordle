import React from 'react';
import { FormattedGuess } from '../hooks/useWordle';

function Row({ guess }: { guess: FormattedGuess }) {
  return (
    <>
      {guess.length > 0 ? (
        <div className="row past">
          {guess.map((letter, index) => (
            <div key={index} className={letter.color}>
              {letter.key}
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
}

export default Row;
