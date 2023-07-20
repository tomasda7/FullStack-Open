import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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
