# Sprint Challenge: Advanced Web Applications

In this challenge, you will write the logic for [THIS APP](https://advanced-apps-articles.herokuapp.com/).

## Tools

- Node 16.x
- NPM 8.x (update NPM executing `npm i -g npm`)
- Unix-like shell (Gitbash/bash/zsh)
- Chrome >= 100.x

❗ Other configurations might work but haven't been tested.

## Project Setup

- Fork, clone, and `npm install`. You won't need to add any extra libraries.
- Launch the project in a development server executing `npm run dev`.
- Visit your app by navigating Chrome to `http://localhost:3000`.
- Run tests locally executing `npm test`.
- Local test modules are `codegrade_mvp.test.js` and `Spinner.test.js`.

## Studying the prototype

❗ Open the live prototype linked above and study its functionality using the following **Chrome Dev Tools**:

- **Elements tab** shows the exact DOM rendered as we interact with the UI. Look at texts but also at ids and class names.
- **Network tab** shows the HTTP messages. "Payload" shows the request payload from the client (if any) and "Preview" shows the payload in the server response.
- **Components tab** shows application state and the props each component gets passed (although the names of the components are minified during deployment).

## Studying the API

The endpoints needed for this project are the following:

**LOGIN:** `[POST] http://localhost:9000/api/login`
  - Expects a payload with: `username`, `password`
    - ex: `{ "username": "foo", "password": "12345678" }`
    - `username` length must be >= 3, after trimming
    - `password` length must be >= 8, after trimming
  - Catch response includes `200 OK` & auth token
**ARTICLES:** `[GET] http://localhost:9000/api/articles`
  - Expects an `Authorization` request header with an auth token
  - Catch response includes `200 OK` and a list of articles
    - list could be empty
**ADD ARTICLE:** `[POST] http://localhost:9000/api/articles`
  - Expects an `Authorization` request header with an auth token
  - Expects a payload with: `title`, `text`, `topic`
    - ex: `{ "title": "foo", "text": "bar", "topic": "React" }`
    - `title` & `text` length must be >= 1, after trimming
    - `topic` must be one of: `React`, `JavaScript`, or `Node`
  - Catch response includes `201 Created`, success message, & new article
**EDIT ARTICLE:** `[PUT] http://localhost:9000/api/articles/:article_id`
  - Expects an `Authorization` request header with an auth token
  - Expects a payload with: `title`, `text`, `topic`
    - ex: `{ "title": "foo", "text": "bar", "topic": "React" }`
    - `title` & `text` length must be >= 1, after trimming
    - `topic` must be one of: `React`, `JavaScript`, or `Node`
  - Catch response includes `200 OK`, success message, & updated article
**DELETE ARTICLE:** `[DELETE] http://localhost:9000/api/articles/:article_id`
  - Expects an `Authorization` request header with an auth token
  - Catch response includes `200 OK` & success message

❗ Test drive all these endpoints with [Postman](https://www.postman.com/downloads/) before starting with the project.

## MVP

In order to complete this project, you must fix the following modules:

- [frontend/axios/index.js](frontend/axios/index.js)
- [frontend/components/App.js](frontend/components/App.js)
- [frontend/components/LoginForm.js](frontend/components/LoginForm.js)
- [frontend/components/Articles.js](frontend/components/Articles.js)
- [frontend/components/ArticleForm.js](frontend/components/ArticleForm.js)

You must also also test the Spinner component in this module:

- [frontend/components/Spinner.test.js](frontend/components/Spinner.test.js)

### Notes

- Find specific instructions and hints inside each of the modules linked above.
- The structure of the DOM must match that of the prototype: take care not to remove existing classnames, ids, etc.
- Most components include a prop-types declaration at the bottom, to explain what props -and of what data types- they expect.
- Unmet prop-types expectations will cause warnings in the console, to advise that props are missing, or of the wrong type of data.
- Try to get the functionality of the app as close as possible to that of the prototype. Not all of it is covered by auto tests.

## MVP Short Explanation

❗ ALL TESTS MUST PASS
