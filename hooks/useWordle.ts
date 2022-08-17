import { useState } from 'react';

export type FormattedGuess = {
  key: string;
  color: string;
}[];

type IUsedKeys = {
  [key: string]: 'green' | 'yellow' | 'grey';
};

const TURN_LIMIT = 5; //* 턴 제한
const CHAR_LIMIT = 5; //* 글자수 제한

/**
 * Wordle 관련 Hook
 * @param answer - an Answer String
 */
export function useWordle(answer: string) {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(''); // 현재 입력한 추측값
  const [history, setHistory] = useState<string[]>([]); // 추측값들을 담은 배열 (문자열 배열)
  const [guesses, setGuesses] = useState<FormattedGuess[]>(Array(6).fill([])); // 포맷팅한 추측값들의 배열
  const [usedKeys, setUsedKeys] = useState<IUsedKeys>({}); // 키패드에 사용된 키들을 표시하기 위한 객체
  const [isCorrect, setIsCorrect] = useState(false);

  /**
   * 각 문자들을 포맷팅하여 배열에 넣어주는 함수
   * @example [{key: 'a', color: 'yellow'}, [{key: 'c', color: 'green'}]
   */
  const formatCurrentGuess = () => {
    //* 초기 설정
    const answerArray = Array.from(answer);
    const formattedGuess = Array.from(currentGuess).map((letter) => ({
      key: letter,
      color: 'grey',
    }));

    //* 문자가 존재하고 위치가 같은지 확인
    formattedGuess.forEach((item, index) => {
      if (item.key === answerArray[index]) {
        item.color = 'green';
        answerArray[index] = '_'; //? 이미 확인했으니 다음 확인 대상에서 제외
      }
    });

    //* 문자는 존재하나 다른 위치일 경우를 확인 (이미 확인한 것은 제외)
    formattedGuess.forEach((item) => {
      if (answerArray.includes(item.key) && item.color !== 'green') {
        item.color = 'yellow';
        answerArray[answerArray.indexOf(item.key)] = '_';
      }
    });

    return formattedGuess;
  };

  /**
   * add a new guess to the guessed state
   * update the isCorrect state if the guess is correct
   * add one to the turn state
   */
  const addNewGuess = (formattedGuess: FormattedGuess) => {
    // 정답인지 확인
    if (currentGuess === answer) {
      setIsCorrect(true);
    }

    // guesses 배열에 추가 (해당 turn에 해당하는 인덱스에 넣어준다.)
    setGuesses((prev) => [
      ...prev.slice(0, turn),
      formattedGuess,
      ...prev.slice(turn + 1),
    ]);

    // history 배열에 추가
    setHistory((prev) => [...prev, currentGuess]);

    // turn 추가
    setTurn((prev) => prev + 1);

    //? 키패드 색깔 정하기
    setUsedKeys((prevUsedKeys) => {
      /**
       *? 현재 키패드의 색깔과 다음에 표시될 글자의 색깔을 비교해서 다음 키패드의 색깔을 정한다.
       */
      formattedGuess.forEach((letter) => {
        const currentColor = prevUsedKeys[letter.key]; // 현재 키패드의 색깔 (이미 칠해져 있는 색깔)

        if (letter.color === 'green') {
          prevUsedKeys[letter.key] = 'green';
          return;
        }

        //* 이미 초록색인 경우에는 초록색 유지 아니면 노란색으로 변경
        if (letter.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[letter.key] = 'yellow';
          return;
        }

        //* 이미 초록색이나 노란색이 아니라면 회색으로 변경
        if (letter.color === 'grey' && currentColor !== ('green' || 'yellow')) {
          prevUsedKeys[letter.key] = 'grey';
          return;
        }
      });

      return prevUsedKeys;
    });

    // 입력값 초기화
    setCurrentGuess('');
  };

  /**
   *## 키 이벤트 핸들러
   */
  const handleKeyUp = ({ key }: KeyboardEvent) => {
    /**
     *? 현재 입력한 값을 저장하고, 엔터를 누르면 추측값을 배열에 추가한다.
     */
    if (key === 'Enter') {
      if (turn > TURN_LIMIT) {
        console.log('Limit 5 turn');
        return;
      }

      if (history.includes(currentGuess)) {
        console.log('You already tried that word');
        return;
      }

      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars.');
        return;
      }

      //* 추측값을 화면에 보여주기 위해 포맷팅
      const formatted = formatCurrentGuess();

      addNewGuess(formatted);
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < CHAR_LIMIT) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyUp, usedKeys };
}
