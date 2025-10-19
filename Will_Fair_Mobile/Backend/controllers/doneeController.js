// Donee Controller
exports.registerIndividual = async (req, res) => {
  require('../models/doneeModel').registerIndividual(req, res);
};

exports.registerRepresentative = async (req, res) => {
  require('../models/doneeModel').registerRepresentative(req, res);
};

exports.login = async (req, res) => {
  require('../models/doneeModel').login(req, res);
};
