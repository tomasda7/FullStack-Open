
const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  return likes.length ? likes.reduce((total,curr) => total + curr) : 0
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))

    return blogs.map(blog => {
        return  { title: blog.title, author: blog.author, likes: blog.likes }
    }).find(blog => blog.likes === mostLikes)
}

 module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
