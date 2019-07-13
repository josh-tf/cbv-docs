# cbv-docs

A small web app for publishing volunteer process guides at a nonprofit.

> Archived. No longer maintained.

Guides are written in a rich-text editor in the React front end and stored as HTML in MongoDB. Each guide has a title, contents and a slug, and can be created, viewed by slug, edited and deleted. The front end talks to a separate Express API under `/docs`.

## Stack

- `frontend/`: React (Create React App), React Router, `react-draft-wysiwyg`, axios
- `backend/`: Node.js (both `package.json` files pin Node 10.15.3), Express, Mongoose
- MongoDB

## Develop

```sh
# needs a MongoDB server; defaults to mongodb://localhost:27017/Docs
cd backend && npm install && npm start     # API on port 4000
cd frontend && npm install && npm start    # React dev server
```

The API reads `MONGODB_URI` and `PORT` from the environment when they are set. The front end calls the old Heroku-hosted API at a hard-coded address in `frontend/src/App.js` and `frontend/src/components/`; to run it locally, point those calls at `http://localhost:4000/docs`.

## License

[MIT](LICENSE)
