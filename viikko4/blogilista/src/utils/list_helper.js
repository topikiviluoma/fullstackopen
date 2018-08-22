const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(function(sum, blog) {
        return sum + blog.likes
    }, 0)
}

const mostLikes = (blogs) => {
    const favourite = blogs.reduce((max, blog) => {
       return blog.likes > max.likes ? blog : max
    })
    console.log(favourite)
    return favourite
}

module.exports = {
    dummy,
    totalLikes,
    mostLikes
}