const fs = require('fs');
const express = require("express");
const app = express();
// const cors = require('cors');
// app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = 3000;

const {createProject, getProjects, updateProject, deleteProject} = require('./controller/controller.js');

// CREATE
app.post('/create', (req, res) => {
  console.log('New Project: ', req.body);
  createProject(req.body)
    .then((data) => (res.sendStatus(201)))
    .catch((error) => (console.log('post error', error)));
});

// READ
app.get('/projects', (req, res) => {
  console.log('GETTING PROJECTS');
  getProjects()
  .then((data) => {
    // console.log('SERVER GOT: ', data)
    res.send(data)
  })
  .catch((error) => (console.log('get error', error)));
});

// UPDATE
// Should be put?
app.put('/project', (req, res) => {
  // console.log(req.body);
  updateProject(req.body)
    .then((data) => (res.sendStatus(202)))
    .catch((error) => (console.log('put error', error)));
});

app.delete('/project', (req, res) => {
  console.log(req.query.id)
  deleteProject(req.query.id)
    .then((data) => (res.sendStatus(202)))
    .catch((error) => (console.log('delete error', error)));
});

app.listen(PORT, () => {
  console.log(`Project Maker @ http://127.0.0.1:${PORT}`);
});
