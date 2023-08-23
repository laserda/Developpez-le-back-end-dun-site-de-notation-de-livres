const mongoose = require("mongoose");
require('dotenv').config()

  module.exports = async () => {
    mongoose.connect('mongodb://' + process.env.DB_HOST + '/dbGrimoire',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
  }