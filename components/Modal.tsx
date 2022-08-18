import React from 'react';

function Modal({
  isCorrect,
  turn,
  answer,
  onRestart,
}: {
  turn: number;
  isCorrect: boolean;
  answer: string;
  onRestart: () => void;
}) {
  return (
    <article className="modal">
      <div>
        <h1>{isCorrect ? 'Success' : 'Failure'}</h1>
        <p>
          Answer : <span className="answer">{answer}</span>
        </p>
        {isCorrect && <p>Your Turns : {turn}</p>}
        <button onClick={onRestart}>Restart</button>
      </div>
    </article>
  );
}

export default Modal;
