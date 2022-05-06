import React, { useState } from 'react';

type FormattedGuess = {
  key: string;
  color: string;
}[];

export function useWordle(solution: string) {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(''); // 현재 입력한 추측값

  const [guesses, setGuesses] = useState<FormattedGuess[]>([]); // each guess is array
  const [history, setHistory] = useState<string[]>([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  /**
   * format a guess into an array of letter objects
   * e.g. [{key: 'a', color: 'yellow}]
   */
  const formatGuess = () => {
    //* 초기 설정
    const solutionArray = Array.from(solution);
    const formattedGuess = Array.from(currentGuess).map((letter) => ({
      key: letter,
      color: 'grey',
    }));

    //* 문자가 존재하고 위치가 같은지 확인
    formattedGuess.forEach((item, index) => {
      if (item.key === solutionArray[index]) {
        item.color = 'green';
        solutionArray[index] = '_'; //? 이미 확인했으니 다음 확인 대상에서 제외
      }
    });

    //* 문자는 존재하나 다른 위치일 경우를 확인 (이미 확인한 것은 제외)
    formattedGuess.forEach((item) => {
      if (solutionArray.includes(item.key) && item.color !== 'green') {
        item.color = 'yellow';
        solutionArray[solutionArray.indexOf(item.key)] = '_';
      }
    });

    return formattedGuess;
  };

  /**
   * add a new guess to the guessed state
   * update the isCorrect state if the guess is correct
   * add one to the turn state
   */
  const addNewGuess = (formatted: FormattedGuess) => {
    // 정답인지 확인
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    // guesses 배열에 추가
    setGuesses((prev) => [...prev, formatted]);

    // history 배열에 추가
    setHistory((prev) => [...prev, currentGuess]);

    // turn 추가
    setTurn((prev) => prev + 1);

    // 입력값 초기화
    setCurrentGuess('');
  };

  /**
   * handle keyup event & track current guess
   * if user presses enter, add the new guess
   */
  const handleKeyUp = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      //* 5턴까지만 입력을 받는다.
      if (turn > 5) {
        console.log('limit 5 turn');
        return;
      }

      //* 중복은 허용하지 않는다.
      if (history.includes(currentGuess)) {
        console.log('you already tried that word');
        return;
      }

      //* 5자리만 입력을 허용한다.
      if (currentGuess.length !== 5) {
        console.log('word must me 5 chars.');
        return;
      }

      //* 포맷팅
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

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
