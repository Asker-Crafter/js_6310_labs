import { render, screen, fireEvent } from '@testing-library/react'

import App from './App'

describe('App component', () => {
  it('renders the main application header', () => {
    render(<App />)
    const headerElement = screen.getByText(/Tetris UI Components Demo/i)

    expect(headerElement).toBeInTheDocument()
  })

  it('changes the next tetromino when the button is clicked', () => {
    render(<App />)
    
    const button = screen.getByRole('button', { name: /Следующая случайная фигура/i })
    
    const previewContainer = screen.getByTestId('next-tetromino-preview')
    
    const initialHtml = previewContainer.innerHTML

    fireEvent.click(button)

    const afterClickHtml = previewContainer.innerHTML

    expect(afterClickHtml).not.toBe(initialHtml)
  })
})