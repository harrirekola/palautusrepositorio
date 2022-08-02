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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}