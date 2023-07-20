import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('a blog renders only the blogs title and author', () => {

  const blog = {
    title: 'Test render',
    author: 'Tomas',
    url: 'http//tomasblog.com',
    likes: 222
  }

  render(<Blog blog={blog}/>)

  const title = screen.getByText('Test render')
  const author = screen.getByText('Tomas')
  const url = screen.queryByText('http//tomasblog.com')
  const likes = screen.queryByText('222')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('the blogs URL and number of likes are shown when the button show has been clicked',
  async () => {

    const blog = {
      title: 'Test render',
      author: 'Tomas',
      url: 'http//tomasblog.com',
      likes: 222
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const url = screen.getByText('http//tomasblog.com')
    const likes = screen.getByText('222')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

//$env:CI=$true; npm test
