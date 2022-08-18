import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: 'x',
    author: 'Author X',
    likes: 6,
    url: 'x.com',
    user: {
        id: 123,
        name: 'root'
    },
    id: 456

}

test('renders title and author', () => {

    render(<Blog blog={blog} />)

    const element = screen.getByText('x Author X')

    expect(element).toBeDefined()
})

test('renders url and likes if view button is clicked', async () => {

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} onClick={mockHandler()}/>
    )
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    
    const titleAuthor = screen.getByText('x Author X')
    const url = screen.getByText('x.com')
    const likes = screen.getByText('likes 6')

    expect(titleAuthor).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})

test('clicking like button two times results in two callback function calls', async () => {

    const mockViewHandler = jest.fn()
    const mockLikeHandler = jest.fn()

    render(
        <Blog blog={blog} onClick={mockViewHandler()} updateBlog={mockLikeHandler}/>
    )
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(mockLikeHandler.mock.calls).toHaveLength(2)    
})