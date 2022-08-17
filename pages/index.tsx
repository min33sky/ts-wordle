import Wordle from '@/components/Wordle';
import { getBaseUrl } from '@/lib/getBaseUrl';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

export type SolutionsResponse = {
  letters: {
    key: string;
  }[];
  solution: {
    id: number;
    word: string;
  }[];
};

const Home: NextPage<{ keyword: string }> = ({ keyword }) => {
  const [solution, setSolution] = useState<string>(keyword);

  // useEffect(() => {
  //   fetch('/api/wordle')
  //     .then((res) => res.json())
  //     .then((data: SolutionsResponse) => {
  //       const randomSolution =
  //         data.solution[Math.floor(Math.random() * data.solution.length)].word;
  //       setSolution(randomSolution);
  //     });
  // }, []);

  return (
    <div>
      <h1>Wordle (Lingo)</h1>
      <div>solution - {solution}</div>
      {solution && <Wordle solution={solution} />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await fetch(`${getBaseUrl()}/api/wordle`);
  const data = await res.json();
  return {
    props: {
      keyword:
        data.solution[Math.floor(Math.random() * data.solution.length)].word,
    },
  };
};
