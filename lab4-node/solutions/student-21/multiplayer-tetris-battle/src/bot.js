import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { getRandomTetromino } from './utils/index.js';

dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;

const runBot = () => {
  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я бот-справочник для игры в мультиплеерный Тетрис. Используй команды /rules, /field, /next_tetramino.');
  });

  bot.onText(/\/rules/, (msg) => {
    const chatId = msg.chat.id;
    const rules = `
Правила "Multiplayer Tetris Battle"

=== Цель игры: продержаться дольше всех; последний выживший — победитель.
    
=== Как отправлять мусор?
Одновременная очистка нескольких линий на твоем поле атакует противников таким образом:
  2 линии (double) → 1 линия мусора
  3 линии (triple) → 2 линии мусора
  4 линии (tetris) → 4 линии мусора

=== Как работает защита?
  Входящие атаки копятся в очереди.
  Своими атаками можно гасить мусор в очереди.
  Если не очистить линию, мусор поднимается снизу.

=== Выбор цели?
  Атаки можно направлять на конкретного игрока в случае, когда одновременно играет три человека.
  Это производится с целью добить слабого игрока или ослабить лидера.
`;
    bot.sendMessage(chatId, rules, { parse_mode: 'Markdown' });
  });

  bot.onText(/\/field/, (msg) => {
    const chatId = msg.chat.id;
    const emptyField = `
Пустое поле для игры (10x20):
\`\`\`
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
|..........|
------------
\`\`\`
    `;
    bot.sendMessage(chatId, emptyField, { parse_mode: 'Markdown' });
  });

  bot.onText(/\/next_tetramino/, (msg) => {
    const chatId = msg.chat.id;
    const tetromino = getRandomTetromino();
    bot.sendMessage(chatId, tetromino, { parse_mode: 'Markdown' });
  });

  console.log('Бот "Multiplayer Tetris Battle" запущен...');
};

export default runBot;