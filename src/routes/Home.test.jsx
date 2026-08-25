import {fireEvent, render, screen } from '@testing-library/react'
import Home from './Home'

afterEach(() => {
  vi.unstubAllGlobals()
})

test('loads and shows a game from the API', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([
      { id: 29, title: 'Hades', status: 'Finished', hours_played: 25, achievements: 15 }
    ])
  }))

  render(<Home />)

  expect(await screen.findByText('Hades')).toBeInTheDocument()
})
test('clicking edit fills the form with the game', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([
      { id: 29, title: 'Hades', status: 'Finished', hours_played: 25, achievements: 15 }
    ])
  }))

  render(<Home />)

  fireEvent.click(await screen.findByRole('button', { name: 'edit' }))

  expect(screen.getByLabelText('Game title')).toHaveValue('Hades')
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
})
test('shows an error when the API rejects an empty form', async () => {
  vi.stubGlobal('fetch', vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    })
    .mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'The title field is required.' })
    })
  )

  render(<Home />)

  fireEvent.click(await screen.findByRole('button', { name: 'Add Game' }))

  expect(await screen.findByText('The title field is required.')).toBeInTheDocument()
})