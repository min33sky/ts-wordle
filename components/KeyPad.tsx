function KeyPad({
  keys,
  usedKeys,
}: {
  keys: { key: string }[];
  usedKeys: { [key: string]: 'green' | 'yellow' | 'grey' };
}) {
  console.log('사용된 키들: ', usedKeys);

  return (
    <div className="keypad">
      {keys.map((letter) => (
        <div key={letter.key}>{letter.key}</div>
      ))}
    </div>
  );
}

export default KeyPad;
