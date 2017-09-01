module.exports = (client, config) =>{
  require('./muzak.js')(client, config);
  require('../PerServer/FirstTimeGamer/main')(client);
  require('../PerServer/Overwatch Blanca/main')(client);
  require('../PerServer/mahamas ART/main')(client);
  require('../PerServer/Pits Discord/main')(client);
  require('../PerServer/UGS/main')(client);
};