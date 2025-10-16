// Donee Controller
const doneeModel = require('../models/doneeModel');

exports.registerIndividual = async (req, res) => {
  doneeModel.registerIndividual(req, res);
};

exports.registerRepresentative = async (req, res) => {
  doneeModel.registerRepresentative(req, res);
};

exports.login = async (req, res) => {
  doneeModel.login(req, res);
};
