// Volunteer Controller
const volunteerModel = require('../models/volunteerModel');

exports.registerIndividual = async (req, res) => {
  volunteerModel.registerIndividual(req, res);
};

exports.registerRepresentative = async (req, res) => {
  volunteerModel.registerRepresentative(req, res);
};

exports.login = async (req, res) => {
  volunteerModel.login(req, res);
};
