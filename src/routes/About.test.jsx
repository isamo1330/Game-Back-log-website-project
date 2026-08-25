import { render, screen } from '@testing-library/react'
import About from './About'

test('renders the page heading', () => {
  render(<About />)
  const heading = screen.getByRole('heading', { name: 'About Game Backlog' })
  expect(heading).toBeInTheDocument()
})