const mongoose = require('mongoose');
const Project = require('../model/model.js');
const PASSWORD = 'IQV4idmtN6JDtjz0';

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://intern:${PASSWORD}@cluster0.tl7g5ow.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then((data) => (console.log('mongo success!')))
  .catch((error) => (console.log(error)));

// Create a document
// Returns a promise
// TODO: Implement pagination.
const createProject = (projectData) => {
    return Project.create(projectData);
  };

// Read all documents
// Make queries promises with exec()
const getProjects = () => {
  return Project.find().exec();
};

// Update a document
const updateProject = (projectData) => {

  // Format the link to be based on the name.
  // EX:  name: 'Project Name', link: 'project-name'
  const linkLowerCase = projectData.name.toLowerCase().split(' ').join('-');

  const filter = { '_id': projectData._id };

  const update = {
    name: projectData.name,
    link: `${linkLowerCase}`,
    client: projectData.client,
    client_url: projectData.client_url,
    date: projectData.date,
    short: projectData.short,
    info: projectData.info,
    tech: projectData.tech,
    photos: projectData.photos,
  };

  const options = { 'upsert': false };

  return Project.findOneAndUpdate(filter, update, options).exec();
}

// Delete a document
const deleteProject = (id) => {
  return Project.deleteOne({_id: id}).exec();
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
