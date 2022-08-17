import Header from '@/components/Header';
import Wordle from '@/components/Wordle';
import { getBaseUrl } from '@/lib/getBaseUrl';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage<{ keyword: string }> = ({ keyword }) => {
  const [solution, setSolution] = useState<string>(keyword);

  console.log('Solution: ', solution);

  return (
    <>
      <Head>
        <title>Wordle</title>
      </Head>
      <Header />
      <main>
        <Wordle solution={solution} />
      </main>
    </>
  );
};

export default Home;

export interface IKeywordResponse {
  solution: {
    id: number;
    word: string;
  }[];
}

export const getServerSideProps = async () => {
  const res = await fetch(`${getBaseUrl()}/api/wordle`);
  const data: IKeywordResponse = await res.json();

  return {
    props: {
      keyword:
        data.solution[Math.floor(Math.random() * data.solution.length)].word,
    },
  };
};
