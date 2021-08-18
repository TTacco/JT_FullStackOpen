const mostBlogs = require('../utils/testing_helper').mostBlogs
const helper = require('./blogtest_helper')


describe('MostBlog', () => {

  test('Most Blogs Test', () => {

    expect(mostBlogs(helper.placeholderBlogs)).toStrictEqual({author: 'Robert C. Martin', blogs: 3})
  })

})