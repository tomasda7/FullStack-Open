
const dummy = (blogs) => {
  return 1;
}

const totalLikes = (posts) => {
  const likes = posts.map(post => post.likes)

  return likes.length ? likes.reduce((total,curr) => total + curr) : 0
}


module.exports = {
  dummy,
  totalLikes
}
