import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../button'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('pageNotFound/Button', () => {
  it('navigates to /home when clicked', async () => {
    const user = userEvent.setup()
    render(<Button />)

    await user.click(screen.getByRole('button', { name: /back to homepage/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/home')
  })
})

