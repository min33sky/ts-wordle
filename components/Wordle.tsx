import React, { useEffect, useState } from 'react';
import { useWordle } from '../hooks/useWordle';
import Grid from './Grid';
import KeyPad from './KeyPad';
import Modal from './Modal';
import { Portal } from './Portal';

function Wordle({ solution }: { solution: string }) {
  const { currentGuess, handleKeyUp, turn, guesses, isCorrect, usedKeys } =
    useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  //* 키보드 이벤트 등록
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyUp);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyUp);
    }

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  useEffect(() => {
    console.log(`guess: `, guesses);
    console.log(turn, isCorrect);
  }, [guesses, isCorrect, turn]);

  return (
    <>
      <div>Current Guess - {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <KeyPad usedKeys={usedKeys} />
      {showModal && (
        <Portal>
          <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
        </Portal>
      )}
    </>
  );
}

export default Wordle;
