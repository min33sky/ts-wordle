import { KEYPADS } from '../constants/keypad';

function KeyPad({ usedKeys }: { usedKeys: { [key: string]: 'green' | 'yellow' | 'grey' } }) {
  return (
    <div className="keypad">
      {KEYPADS.map((letter) => (
        <div key={letter.key} className={usedKeys[letter.key]}>
          {letter.key}
        </div>
      ))}
    </div>
  );
}

export default KeyPad;
