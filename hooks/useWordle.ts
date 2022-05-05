import React, { useState } from 'react';

export function useWordle(solution: string) {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(''); // 현재 추측한 입력값
  const [guesses, setGuesses] = useState([]); // each guess is array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  /**
   * format a guess into an array of letter objects
   * e.g. [{key: 'a', color: 'yellow}]
   */
  const formatGuess = () => {};

  /**
   * add a new guess to the guessed state
   * update the isCorrect state if the guess is correct
   * add one to the turn state
   */
  const addNewGuess = () => {};

  /**
   * handle keyup event & track current guess
   * if user presses enter, add the new guess
   */
  const handleKeyUp = ({ key }: KeyboardEvent) => {
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyUp };
}
