# CBV Docs

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/josh-tf/cbv-docs/graphs/commit-activity)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/josh-tf/cbv-docs.svg)](https://github.com/josh-tf/cbv-docs/pulls/)
[![GitHub issues](https://img.shields.io/github/issues/josh-tf/cbv-docs.svg)](https://GitHub.com/josh-tf/cbv-docs/issues/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![GitHub commits](https://img.shields.io/github/commit-activity/y/josh-tf/cbv-docs.svg)](https://github.com/josh-tf/cbv-docs/commit/)

**cbv-docs** is a simple web application for publishing online process guides at [Computerbank Victoria Inc.](http://computerbank.org.au).

The goal of the project is to create an easy to use/manage document system with possible future expansion with other volunteer related features (rosters, chat, file sharing etc).

## Stack

Details of the current full-stack can be found below, components may change or be added in the future as additional requirements are included in the project pipeline.

**Front end -** [React](https://reactjs.org/) <br>
**Back end -** [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) <br>
**Database -** [MongoDB](https://www.mongodb.com/) <br>

![](https://i.imgur.com/CylWiH5.jpg) ![](https://i.imgur.com/EGWlnxq.jpg) <br>
![](https://i.imgur.com/QWG5K3P.jpg) ![](https://i.imgur.com/8k0NJQN.jpg)


## Installation / Running Locally

Clone this repository then run the following commands:
```bash
cd ./frontend
npm start
cd ./backend
nodemon server
```
`npm start` will run the app server and display the front end<br>
`nodemon server` will run `server.js` which handles the endpoint for database actions (insert, update, etc) via its own router.

## Deploy to Heroku
Deployment to Heroku is easy, the toolbelt is required. Start with `heroku login` and then run the below commands to set up two remote directories:
```bash
# add a remote repo for the frontend
heroku git:remote -a cbv-docs
git remote rename heroku heroku-cbv-docs

# add a remote repo for the backend
heroku git:remote -a cbv-docs-backend
git remote rename heroku heroku-cbv-docs-backend
```

The `package.json` files have preset scripts for deploying to Heroku, to deploy simply run:

```bash
# publish the frontend to Heroku
cd ./frontend/
npm run-script publishheroku

# publish the backend to Heroku
cd ./backend/
npm run-script publishheroku
```
Thats it!

## Database Configuration
The MongoDB server is not provided as part of this package, you will need to run a server instance and create the `cbv-docs` database.

If you are running on a non standard port you can edit this in `backend\server.js` at the top of the file. If its there it will use the `MONGODB_URI` envvar provided by Heroku (remember to add a MongoDB add-on) otherwise you can define your local server here:
```javascript
const DBString = process.env.MONGODB_URI || 'mongodb://localhost:27017/Docs';
```

## To-do / Project Pipeline

This will be an on-going project and will also function as a tool to learn the various components of the stack, you can follow progress on [Trello](https://trello.com/b/eW9I62NV/cbv-docs). Suggestions are welcome, please open an issue to discuss or contact me via the email under my user page.

## Authors & Licence

- Currently developed with ❤️ by [josh-tf](https://github.com/josh-tf)
- This project is created under the [MIT](https://choosealicense.com/licenses/mit/) licence
