import { useState } from 'react'

import { Glass, NextTetromino, type GameBoard, type Tetromino } from '@my-app/ui-library'

import '@my-app/ui-library/style.css'
import { getRandomTetromino, TETROMINOS } from './tetrominos'
import './App.css'

const initialBoard: GameBoard = Array.from({ length: 17 }, () => Array(10).fill(0))

initialBoard.push([0, 0, 0, 0, 0, 0, 0, 6, 6, 6])
initialBoard.push([7, 7, 0, 0, 1, 1, 1, 1, 6, 0])
initialBoard.push([7, 7, 0, 0, 5, 5, 4, 4, 0, 0])

function App() {
  const [board] = useState<GameBoard>(initialBoard)
  const [nextTetromino, setNextTetromino] = useState<Tetromino>(TETROMINOS.T)

  const handleNextClick = () => {
    setNextTetromino(getRandomTetromino())
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tetris UI Components Demo</h1>
        <p>Демонстрация работы компонентов `Glass` и `NextTetromino`</p>
      </header>
      <main className="app-main">
        <div className="game-area">
          <h2>Компонент "Стакан" (`Glass`)</h2>
          <Glass board={board} />
        </div>
        <aside className="sidebar">
          <div className="preview-area">
            <h2>Следующая фигура (`NextTetromino`)</h2>
            <div data-testid="next-tetromino-preview">
              <NextTetromino tetromino={nextTetromino} />
            </div>
            <button onClick={handleNextClick} className="action-button">
              Следующая случайная фигура
            </button>
          </div>
          <div className="info-area">
            <h3>Описание</h3>
            <p>Компонент `Glass` отображает игровое поле тетриса.</p>
            <p>Компонент `NextTetromino` отображает следующую фигуру.</p>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App