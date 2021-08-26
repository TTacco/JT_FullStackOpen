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

  useEffect(() => {
    const fetchBlogs = async() => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()

  }, [])

  const stateChanger = (stateChange) => {
    return function(event){
      stateChange(event.target.value)
    }
  }

  const loginUser = async (event) => {
    event.preventDefault()
    console.log(`Logging in as ${username} with password as ${password}`)
    try{
      const userLoggedIn = await loginService.login(username, password)
      setUser(setUser(userLoggedIn))

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(userLoggedIn)) 
      loginService.setToken(userLoggedIn.token)
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


  const renderLoginForm = () => (
    <div>
      <h2>Login</h2>
      <form className='debug form'>
        <div className='form-elements'>
          <label>USERNAME: </label> 
          <input value={username} onChange={stateChanger(setUsername)}/>
        </div>
        <div className='form-elements'>
          <label>PASSWORD: </label> 
          <input value={password} onChange={stateChanger(setPassword)}/>
        </div>
        <button onClick={loginUser}>Login</button>
      </form>
    </div>
  )

  const renderLogStatus = () => (
    <div>
      <h2>User has logged in</h2>
      <button onClick={logoutUser}>Logout</button>
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
      {user !== null && renderLogStatus()}
      {renderBlogs()}
    </div>
  )
}

export default App