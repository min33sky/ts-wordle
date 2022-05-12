import React from 'react';

function Modal({
  isCorrect,
  turn,
  solution,
}: {
  turn: number;
  isCorrect: boolean;
  solution: string;
}) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>추카추카추</h1>
          <p className="solution">{solution}</p>
          <p>당신이 답을 찾는데 걸린 턴 : {turn}</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>턴을 다 썼스요.....</h1>
          <p className="solution">{solution}</p>
          <p>담에 잘하자.... :)</p>
        </div>
      )}
    </div>
  );
}

export default Modal;
