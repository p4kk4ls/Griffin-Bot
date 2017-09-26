module.exports = (client, config) =>{
  require('./muzak.js')(client, config);
  // require('../PerServer/Lang Hub/main')(client);
  require('../PerServer/mahamas ART/main')(client);
  require('../PerServer/Pits Discord/main')(client);
  require('../PerServer/UGS/main')(client);
};