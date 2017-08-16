module.exports = (client) =>{
  require('./muzak.js')(client);
  require('../PerServer/FirstTimeGamer/main')(client);
  require('../PerServer/Overwatch Blanca/main')(client);
  require('../PerServer/mahamas ART/main')(client);
};