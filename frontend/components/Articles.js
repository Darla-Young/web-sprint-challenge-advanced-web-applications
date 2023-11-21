import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles(props) {
 const navigate = useNavigate()
  const {
   articles,
   getArticles,
   deleteArticle,
   currentArticle,
   setCurrentArticle,
  } = props

  useEffect(() => {
   if (!localStorage.getItem('token')) {
    navigate('/')
   } else {
    getArticles()
   }
  },[])

  const toEdit = evt => {
    setCurrentArticle({
      article_id: evt.target.id,
      title: evt.target.title,
      text: evt.target.text,
      topic: evt.target.topic,
    })
  }

  const toDelete = evt => {
    deleteArticle(evt.target.id)
    getArticles()
  }

  return (
    <div className="articles">
      <h2>Articles</h2>
      {
        !articles.length
          ? 'No articles yet'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button disabled={currentArticle ? true : false} onClick={toEdit}>Edit</button>
                  <button disabled={currentArticle ? true : false} onClick={toDelete}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  currentArticle: PT.number, // can be undefined or null
  setCurrentArticle: PT.func.isRequired,
}
