import React from 'react';
import { FormattedGuess } from '../hooks/useWordle';

interface IRow {
  guess: FormattedGuess;
  currentGuess?: string;
}

/**
 * 입력한 추측값을 출력해주는 Row 컴포넌트
 * @param param0
 * @returns
 */
function Row({ guess, currentGuess }: IRow) {
  /**
   *? 현재 입력중인 추측값이 있다면 출력해준다.
   */
  if (currentGuess) {
    const letters = currentGuess.split('');

    return (
      <div className="row current">
        {letters.map((letter, index) => (
          <div key={index} className="filled">
            {letter}
          </div>
        ))}
        {[...Array(5 - currentGuess.length)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  }

  return (
    <>
      {guess.length > 0 && (
        <div className="row past">
          {guess.map((letter, index) => (
            <div key={index} className={letter.color}>
              {letter.key}
            </div>
          ))}
        </div>
      )}

      {guess.length == 0 && (
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
