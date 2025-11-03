const TETROMINOES = {
  I: 'IIII',
  O: 'OO\nOO',
  T: 'TTT\n T ',
  L: 'L \nL \nLL',
  J: ' J\n J\nJJ',
  S: ' SS\nSS ',
  Z: 'ZZ \n ZZ'
};

export const getRandomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return `Фигура ${randomKey}:\n\`\`\`\n${TETROMINOES[randomKey]}\n\`\`\``;
};