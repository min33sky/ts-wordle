import React from 'react';
import { FormattedGuess } from '../hooks/useWordle';
import Row from './Row';

interface IGrid {
  guesses: FormattedGuess[];
  turn: number;
  currentGuess: string;
}

function Grid({ guesses, currentGuess, turn }: IGrid) {
  return (
    <>
      {guesses.map((guess, index) => {
        //? 입력중인 값을 출력
        if (index === turn) {
          return <Row key={index} currentGuess={currentGuess} guess={guess} />;
        }
        //? 이미 입력한 값을 출력
        return <Row key={index} guess={guess} />;
      })}
    </>
  );
}

export default Grid;
