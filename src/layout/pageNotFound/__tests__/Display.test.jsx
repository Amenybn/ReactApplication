import { render, screen } from '@testing-library/react'
import Display from '../display'

vi.mock('../button', () => ({
  default: () => <button type="button">Back to homepage</button>,
}))

describe('pageNotFound/Display', () => {
  it('renders the scarecrow image with alt text', () => {
    render(<Display />)
    expect(screen.getByAltText('404-Scarecrow')).toBeInTheDocument()
  })

  it('renders the main message', () => {
    render(<Display />)
    expect(screen.getByRole('heading', { level: 2, name: /i have bad news for you/i })).toBeInTheDocument()
    expect(
      screen.getByText(/might be removed or is temporarily unavailable/i),
    ).toBeInTheDocument()
  })
})

