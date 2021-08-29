import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //New Blog States
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')


  useEffect(() => {
    const fetchBlogs = async() => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()  

  }, [])

  //Receives a callback function to be used to change 
  const updateState = (stateChange) => {
    return function(event){
      stateChange(event.target.value)
    }
  }

  //===FORM ACTION METHODS===
  const loginUser = async (event) => {
    event.preventDefault()
    console.log(`Logging in as ${username} with password as ${password}`)
    try{
      const userLoggedIn = await loginService.login(username, password)
      setUser(userLoggedIn)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(userLoggedIn)) 
      blogService.setToken(userLoggedIn.token)
    }
    catch(e){
      console.log("Invalid Credentials")
    }
    setUsername('')
    setPassword('')
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogUser') 
    setUser(null)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    const newBlogObj = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL
    }
    console.log(await blogService.createBlog(newBlogObj))
    alert('CREATING NEW BLOG')
  }

  //===RENDER METHODS===
  const renderLoginForm = () => (
    <div>
      <h2>Login</h2>
      <form className='debug form-login'>
        <div>
          <label>USERNAME: </label> 
          <input value={username} onChange={updateState(setUsername)}/>
        </div>
        <div>
          <label>PASSWORD: </label> 
          <input value={password} onChange={updateState(setPassword)}/>
        </div>
        <button onClick={loginUser}>Login</button>
      </form>
    </div>
  )

  const renderLoggedUserInfo = () => (
    <div>
      <div>
        <h2>Welcome: {user.name}</h2>
        <button onClick={logoutUser}>Logout</button>   
      </div>
      <h4>CREATE NEW BLOG</h4>
      <form className='form-createnewblog'>
        <label>Title</label>
        <input value={newBlogTitle} onChange={updateState(setNewBlogTitle)}/>
        <label>Author</label>
        <input value={newBlogAuthor} onChange={updateState(setNewBlogAuthor)}/>
        <label>URL</label>
        <input value={newBlogURL} onChange={updateState(setNewBlogURL)}/> 
        <button onClick={createNewBlog}>Create Blog</button>
      </form>
    </div>
  )

  const renderBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null && renderLoginForm()}
      {user !== null && renderLoggedUserInfo()}
      {renderBlogs()}
    </div>
  )
}

export default App