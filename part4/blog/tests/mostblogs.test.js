const mostBlogs = require('../utils/for_testing').mostBlogs
const blogs = require('./testblogs')


describe('MostBlog', () => {

  test('Most Blogs Test', () => {

    expect(mostBlogs(blogs)).toStrictEqual({author: 'Robert C. Martin', blogs: 3})
  })

})