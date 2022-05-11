import React, { useEffect } from 'react';
import { useWordle } from '../hooks/useWordle';
import Grid from './Grid';
import KeyPad from './KeyPad';

function Wordle({ solution, keys }: { solution: string; keys: { key: string }[] }) {
  const { currentGuess, handleKeyUp, turn, guesses, isCorrect, usedKeys } = useWordle(solution);

  //* 키보드 이벤트 등록
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    console.log(`guess: `, guesses);
    console.log(turn, isCorrect);
  }, [guesses, isCorrect, turn]);

  return (
    <>
      <div>Current Guess - {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <KeyPad keys={keys} usedKeys={usedKeys} />
    </>
  );
}

export default Wordle;
