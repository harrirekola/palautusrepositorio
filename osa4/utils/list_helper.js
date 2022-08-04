const _= require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    const total = blogs.reduce((accum, blogpost) => accum + blogpost.likes, 0)
    return total
}

const favoriteBlog = blogs => {
    const mostLiked = blogs.find(
        blog => blog.likes === Math.max(
        ...blogs.map(blogpost => blogpost.likes)))
    const format = ({author, title, likes}) => ({author, title, likes})
    const formatted = format(mostLiked)
    return formatted
}

const mostBlogs = blogs => {
    const authorList = _.uniq(blogs.map(blog => blog.author))
    const authors = blogs.map(blog => blog.author)
    const blogsPerAuthor = authorList.reduce((accumulator, value) => {
        return {...accumulator, [value]: 0}
    }, {})
    for (let i = 0; i < authorList.length; i++) {
        authors.forEach(val => {
            if(val === authorList[i]) {
                blogsPerAuthor[authorList[i]] = blogsPerAuthor[authorList[i]] + 1
            }
        })
    }
    const result = _.flow([
        Object.entries,
        arr => arr.filter(([key, value]) => value >= Math.max(...Object.values(blogsPerAuthor))),
        Object.fromEntries
    ])(blogsPerAuthor)
    console.log(blogsPerAuthor)
    console.log(result)
    return {
        author: Object.keys(result)[0], 
        blogs: Object.values(result)[0
        ]}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}