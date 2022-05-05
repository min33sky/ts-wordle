import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Wordle from '../components/Wordle';

export type SolutionsResponse = {
  solution: {
    id: number;
    word: string;
  }[];
};

const Home: NextPage = () => {
  const [solution, setSolution] = useState<string>();

  useEffect(() => {
    fetch('/api/wordle')
      .then((res) => res.json())
      .then((data: SolutionsResponse) => {
        console.log(data);
        const randomSolution = data.solution[Math.floor(Math.random() * data.solution.length)].word;
        setSolution(randomSolution);
      });
  }, []);

  return (
    <div>
      <h1>Wordle (Lingo)</h1>
      <div>solution - {solution}</div>
      {solution && <Wordle solution={solution} />}
    </div>
  );
};

export default Home;
