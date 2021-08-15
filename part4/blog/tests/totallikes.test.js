const totalLikes = require('../utils/for_testing').totalLikes

describe('Total likes of a list of blogs', () => {
  test('Example array of blog objects', () => {
    const blogExamples = [
      {
        title: 'Title 1',
        likes: 5
      },
      {
        title: 'Title II',
        likes: 6
      },
      {
        title: 'Title Tres',
        likes: 7
      },
    ]

    expect(totalLikes(blogExamples)).toBe(18)
  })
})