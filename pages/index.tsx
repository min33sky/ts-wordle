import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import KeyPad from '../components/KeyPad';
import Wordle from '../components/Wordle';

export type SolutionsResponse = {
  letters: {
    key: string;
  }[];
  solution: {
    id: number;
    word: string;
  }[];
};

const Home: NextPage = () => {
  const [solution, setSolution] = useState<string>();
  const [keys, setKeys] = useState<{ key: string }[]>();

  useEffect(() => {
    fetch('/api/wordle')
      .then((res) => res.json())
      .then((data: SolutionsResponse) => {
        const randomSolution = data.solution[Math.floor(Math.random() * data.solution.length)].word;
        setSolution(randomSolution);
        console.log(data);
        setKeys(data.letters);
      });
  }, []);

  return (
    <div>
      <h1>Wordle (Lingo)</h1>
      <div>solution - {solution}</div>
      {solution && <Wordle solution={solution} keys={keys || []} />}
    </div>
  );
};

export default Home;
