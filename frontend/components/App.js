import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import { axiosWithAuth } from '../axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [currentArticle, setCurrentArticle] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => (navigate('/'))
  const redirectToArticles = () => (navigate('/articles'))

  const logout = () => {
   localStorage.removeItem('token')
   setMessage("Goodbye!")
   redirectToLogin()
  }

  const login = ({ username, password }) => {
   setMessage('')
   setSpinnerOn(true)
   axios
    .post(loginUrl, { "username": username, "password": password })
    .then(res => {
     setSpinnerOn(false)
     console.log(res)
     // localStorage.setItem('token', res.data.token)
     // setMessage(res.data.message)
     // redirectToArticles()
    })
    .catch(err => {
     setSpinnerOn(false)
     console.log(err)
    })
  }

  const getArticles = () => {
   setMessage('')
   setSpinnerOn(true)
   axiosWithAuth
    .get(articlesUrl)
    .then(res => {
     setSpinnerOn(false)
     console.log(res)
     // setArticles(res.data)
     // setMessage(res.message)
    })
    .catch(err => {
     setSpinnerOn(false)
     console.log(err)
     // err.type === "401" ? redirectToLogin : console.log(err)
    })
  }

  const postArticle = article => {
   setMessage('')
   setSpinnerOn(true)
   axiosWithAuth
    .post(articlesUrl, article)
    .then(res => {
     setSpinnerOn(false)
     console.log(res)
     // setArticles(res.data)
     // setMessage(res.message)
    })
    .catch(err => {
     setSpinnerOn(false)
     console.log(err)
     // err.type === "401" ? redirectToLogin : console.log(err)
    })
  }

  const updateArticle = ({ article_id, article }) => {
   setMessage('')
   setSpinnerOn(true)
   axiosWithAuth
    .put(articlesUrl/article_id, article)
    .then(res => {
     setSpinnerOn(false)
     console.log(res)
     // setArticles(res.data)
     // setMessage(res.message)
    })
    .catch(err => {
     setSpinnerOn(false)
     console.log(err)
     // err.type === "401" ? redirectToLogin : console.log(err)
    })
  }

  const deleteArticle = article_id => {
   setMessage('')
   setSpinnerOn(true)
   axiosWithAuth
    .delete(articlesUrl/article_id)
    .then(res => {
     setSpinnerOn(false)
     console.log(res)
     // setArticles(res.data)
     // setMessage(res.message)
    })
    .catch(err => {
     setSpinnerOn(false)
     console.log(err)
     // err.type === "401" ? redirectToLogin : console.log(err)
    })
  }

  return (
    <>
      <Spinner spinnerOn={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm 
                postArticle={postArticle} 
                updateArticle={updateArticle}
                currentArticleId={currentArticleId}
                currentArticle={currentArticle}
                setCurrentArticle={setCurrentArticle}
              />
              <Articles 
                articles={articles} 
                getArticles={getArticles} 
                deleteArticle={deleteArticle}
                setCurrentArticleId={setCurrentArticleId}
                currentArticleId={currentArticleId}
                setCurrentArticle={setCurrentArticle}
              />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
