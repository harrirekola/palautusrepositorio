const _= require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    const total = blogs.reduce((accum, blogpost) => accum + blogpost.likes, 0)
    return total
}

const favoriteBlog = blogs => {
    const maxLikes = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, 0)
    return {
        "author": maxLikes.author,
        "title": maxLikes.title,
        "likes": maxLikes.likes
    }
}

const mostBlogs = blogs => {
    const authors = []
    blogs.forEach(blog => authors.push(blog.author))
    const blogsPerAuthor = authors.reduce((allAuthors, author) => {
        allAuthors[author] ??= 0
        allAuthors[author]++
        return allAuthors
    }, {})
    const author = (_.max(Object.entries(blogsPerAuthor)))
    return {
        "author": author[0],
        "blogs": author[1]
    }
}

const mostLikes = blogs => {
    let holder = {}
    let likesPerAuthor = []
    blogs.forEach(element => {
        if (holder.hasOwnProperty(element.author)) {
            holder[element.author] = holder[element.author] + element.likes
        } else {
            holder[element.author] = element.likes
        }
    })
    for (var prop in holder) {
        likesPerAuthor.push({ author: prop, likes: holder[prop] })
    }

    return likesPerAuthor.find(x => x.likes === Math.max(...likesPerAuthor.map(o => o.likes)))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}