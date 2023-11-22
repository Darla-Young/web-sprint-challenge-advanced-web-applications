import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const { 
   postArticle,
   updateArticle,
   currentArticle,
   setCurrentArticle,
  } = props

  useEffect(() => {
   currentArticle ? 
     setValues(currentArticle)
     : setValues(initialFormValues)
  },[currentArticle])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    if (currentArticle) {
     const id = currentArticle.article_id
     updateArticle({article_id: id, article: values})
     setCurrentArticle()
     setValues(initialFormValues)
    } else {
     postArticle(values)
     setValues(initialFormValues)
    }
  }

  const onCancel = () => {
   setCurrentArticle()
   setValues(initialFormValues)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticle ? "Edit" : "Create"} Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={values.text && values.title && values.topic ? false : true} id="submitArticle">Submit</button>
        <button onClick={onCancel}>Cancel edit</button>
      </div>
    </form>
  )
}

// LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticle: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
