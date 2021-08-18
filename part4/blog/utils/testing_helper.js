//Get every single blog's total likes
const totalLikes = (array) => {
  return array.reduce((total, currentBlog) => total + currentBlog.likes, 0)
}

//Blog with the highest likes
const favoriteBlog = (array) => {
  return array.reduce((highest, currVal) => {return (currVal > highest)? currVal : highest} , 0) 
}

//Get the person that has written the most amount of blogs
const mostBlogs = (array) => {
  const amountOfBlogsPerAuthor = {}

  //Create a key pair value in the object
  //Key = Author Name
  //Value = Amount of blogs theyve made
  array.forEach(blog => {
    if(amountOfBlogsPerAuthor[blog.author] === undefined){
      amountOfBlogsPerAuthor[blog.author] = 1
    }
    else{
      amountOfBlogsPerAuthor[blog.author] += 1
    }
  })

  //An array containing individual arrays of ["key", value] is iterated through
  /* 
    amountOfBlogsPerAuthor = [
      ["Author Name", 4],
      ["Mr Watson", 7],
      ["James", 2],
    ]
  */
  const bestBlog = Object.entries(amountOfBlogsPerAuthor).reduce((bestPair, currPair) => {
    return (!bestPair || currPair[1] > bestPair[1]) ? currPair : bestPair 
  }, null)

  //bestBlog will contain the key value pair with the highest val which well make into an object
  return {author: bestBlog[0], blogs: (bestBlog[1])}
}

const mostLikes = (array) => {
  const amountOfBlogsPerAuthor = {}

  //Create a key pair value in the object
  //Key = Author Name
  //Value = Amount of blogs theyve made
  array.forEach(blog => {
    if(amountOfBlogsPerAuthor[blog.author] === undefined){
      amountOfBlogsPerAuthor[blog.author] = blog.likes
    }
    else{
      amountOfBlogsPerAuthor[blog.author] += blog.likes
    }
  })

  const bestBlog = Object.entries(amountOfBlogsPerAuthor).reduce((bestPair, currPair) => {
    return (!bestPair || currPair[1] > bestPair[1]) ? currPair : bestPair 
  }, null)

  //bestBlog will contain the key value pair with the highest val which well make into an object
  return {author: bestBlog[0], blogs: (bestBlog[1])}
}



module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}