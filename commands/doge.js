const got = require('got');
const Discord = require('discord.js')

exports.run = (client, message, args, config) => {
  got(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=DOGE&tsyms=USD`, { json: true }).then(response => {
    // 396416921030885379
    message.channel.send({ 
      embed: new Discord.RichEmbed()
      .setAuthor(response.body['DISPLAY']['DOGE']['USD']['FROMSYMBOL'], 'http://hoekomikaangeld.com/wp-content/uploads/2015/12/dogecoin-logo.png')
      .setThumbnail('https://altcoins.com.au/img/logo-lg.png')
      .addField('Price (USD)', response.body['DISPLAY']['DOGE']['USD']['PRICE'])
      .addField('Today\'s high', response.body['DISPLAY']['DOGE']['USD']['HIGHDAY'], true)
      .addField('Today\s low', response.body['DISPLAY']['DOGE']['USD']['LOWDAY'], true)
      .setColor('#FFDF00')
      .setFooter('cryptocompare.com', 'https://freeter.io/embedding-web-apps/cryptocurrency/cryptocompare.png')
      .setTimestamp(new Date())
    })
  }).catch(error => {
    console.log(error);
  });
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'doge',
  description: '',
  longDescription: "",
  usage: ''
};

