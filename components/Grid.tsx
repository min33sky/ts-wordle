import { FormattedGuess } from '@/hooks/useWordle';
import Row from './Row';

interface IGrid {
  guesses: FormattedGuess[];
  turn: number;
  currentGuess: string;
}

function Grid({ guesses, currentGuess, turn }: IGrid) {
  return (
    <section className="grid">
      {guesses.map((guess, index) => (
        <Row
          key={index}
          currentGuess={currentGuess}
          guess={guess}
          active={index === turn}
        />
      ))}
    </section>
  );
}

export default Grid;
