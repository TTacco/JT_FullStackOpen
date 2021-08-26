import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /* useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []) */

  const stateChanger = (stateChange) => {
    return function(event){
      stateChange(event.target.value)
    }
  }

  const loginUser = async (event) => {
    event.preventDefault()
    console.log(`Logging in as ${username} with password as ${password}`)
    console.log(await loginService.login(username, password))
    setUsername('')
    setPassword('')
  }

  return (
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
      <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    </div>
  )
}

export default App