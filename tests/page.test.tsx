import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page - [UNIT]', () => {
  it('should render the page with "Hello, World!" text.', () => {
    render(<Home />)
    expect(screen.getByText('Hello, World!')).toBeDefined()
  })
})
