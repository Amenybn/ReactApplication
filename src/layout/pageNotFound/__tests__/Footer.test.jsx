import { render, screen } from '@testing-library/react'
import Footer from '../footer'

describe('pageNotFound/Footer', () => {
  it('renders footer attribution text', () => {
    render(<Footer />)
    expect(screen.getByText(/arunpariyar\s*-\s*amani/i)).toBeInTheDocument()
  })
})

