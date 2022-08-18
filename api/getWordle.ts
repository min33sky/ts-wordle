import { getBaseUrl } from '@/lib/getBaseUrl';

export interface IKeywordResponse {
  solution: {
    id: number;
    word: string;
  }[];
}

/**
 * Get the wordle
 * @returns a keyword for the wordle
 */
export async function getWordle() {
  const res = await fetch(`${getBaseUrl()}/api/wordle`);
  const data: IKeywordResponse = await res.json();

  return data.solution[Math.floor(Math.random() * data.solution.length)].word;
}
