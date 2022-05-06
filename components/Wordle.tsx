import React, { useEffect } from 'react';
import { useWordle } from '../hooks/useWordle';
import Grid from './Grid';

function Wordle({ solution }: { solution: string }) {
  const { currentGuess, handleKeyUp, turn, guesses, isCorrect } = useWordle(solution);

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
      <Grid />
    </>
  );
}

export default Wordle;
