const got = require('got');
const Discord = require('discord.js')

exports.run = (client, message, args, config) => {
  got(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${args[0]}&tsyms=USD`, { json: true }).then(response => {
    // 396416921030885379
    message.channel.send({ 
      embed: new Discord.RichEmbed()
      .setAuthor(response.body['DISPLAY']['DOGE']['USD']['FROMSYMBOL'], 'hhttps://cdn2.iconfinder.com/data/icons/bitcoin-and-mining/44/trade-512.png')
      .addField('Price (USD)', response.body['DISPLAY'][1][1]['PRICE'])
      .addField('Today\'s high', response.body['DISPLAY'][1][1]['HIGHDAY'], true)
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
  name: 'crypto',
  description: '',
  longDescription: "",
  usage: ''
};

