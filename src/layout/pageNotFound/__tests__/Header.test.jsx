import { render, screen } from '@testing-library/react'
import Header from '../header'

describe('pageNotFound/Header', () => {
  it('renders the 404 title', () => {
    render(<Header />)
    expect(screen.getByRole('heading', { level: 1, name: /404 not found/i })).toBeInTheDocument()
  })
})

