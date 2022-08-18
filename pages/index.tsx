import { getWordle } from '@/api/getWordle';
import Header from '@/components/Header';
import Wordle from '@/components/Wordle';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage<{ keyword: string }> = ({ keyword }) => {
  const [solution, setSolution] = useState<string>(keyword);

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

export const getServerSideProps = async () => {
  const keyword = await getWordle();

  return {
    props: {
      keyword,
    },
  };
};
