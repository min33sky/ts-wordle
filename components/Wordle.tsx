import { useWordle } from '@/hooks/useWordle';
import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import KeyPad from './KeyPad';
import Modal from './Modal';
import { Portal } from './Portal';

function Wordle({ solution }: { solution: string }) {
  const {
    answer,
    currentGuess,
    handleKeyUp,
    turn,
    guesses,
    isCorrect,
    usedKeys,
    initWordle,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  //* 키보드 이벤트 등록
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 1500);
      window.removeEventListener('keyup', handleKeyUp);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 1500);
      window.removeEventListener('keyup', handleKeyUp);
    }

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  const restart = () => {
    initWordle();
    setShowModal(false);
  };

  return (
    <>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <KeyPad usedKeys={usedKeys} />
      {showModal && (
        <Portal>
          <Modal
            isCorrect={isCorrect}
            turn={turn}
            answer={answer}
            onRestart={restart}
          />
        </Portal>
      )}
    </>
  );
}

export default Wordle;
