import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm /> tests', () => {
  test('checks that the form of a new blog works correctly', async () => {

    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog}/>)

    const inputTitle = screen.getByLabelText('Title')
    const inputAuthor = screen.getByLabelText('Author')
    const inputUrl = screen.getByLabelText('Url')
    const saveButton = screen.getByText('Save')

    await user.type(inputTitle, 'Test Blog')
    await user.type(inputAuthor, 'Mock')
    await user.type(inputUrl, 'http://mocktest.com')
    await user.click(saveButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Mock')
    expect(createBlog.mock.calls[0][0].url).toBe('http://mocktest.com')
  })
})
