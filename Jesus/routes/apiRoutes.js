// routes/apiRoutes.js

var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //------------------------------------------------------
  // Doctors
  //------------------------------------------------------
  app.get("/api/doctors", function(req, res) {
    db.Doctor.findAll({}).then(function(dbResult) {
      res.json(dbResult);
    });
  });

  // Create ---------------------------
  app.post("/api/doctors", function(req, res) {
    db.Doctor.create(req.body).then(function(dbResult) {
      res.json(dbResult);
    });
  });

  // Delete by id ---------------------
  app.delete("/api/doctors/:id", function(req, res) {
    db.Doctor.destroy({ where: { id: req.params.id } }).then(function(dbResult) {
      res.json(dbResult);
    });
  });

  //------------------------------------------------------
  //------------------------------------------------------
};