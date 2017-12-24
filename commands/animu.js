
const Discord = require('discord.js');
const mal = require('MALjs');
const he = require('he');
const awaitInput = require('../Utils/inputAway')

exports.run = async(client, message, args, config) =>{
  var animename = args.join(' ');
  var api = new mal(config.MALlogin, config.MALpass);
  if (args.length < 1){ 
    animename = await awaitInput.run(message, 8000, 1, m => m.author.id == message.author.id)
    if(!animename.first()) return
    animename =  animename.first().content
  }

  api.anime.search(animename)
    .then(result =>{
      var synopsis = result.anime[0].synopsis.toString().replace(/<[^>]+>|\[[^>]+]/gi, '');
      synopsis = he.decode(synopsis);
      if(synopsis.length <= 250) return synopsis = "Desc too long for discord! Sorry, pls don't hurt me"
      const embed = new Discord.RichEmbed()
        .setDescription(synopsis)
        .setAuthor(`${result.anime[0].title} | ${result.anime[0].english}`, result.anime[0].image.toString())
        .setThumbnail(result.anime[0].image.toString())
        .setColor('#8d17d6')
        .addField('Episodes', result.anime[0].episodes, true)
        .addField('Type', result.anime[0].type, true)
        .addField('Score', result.anime[0].score, true)
        .addField('Status', result.anime[0].status, true)
        .addField('Start date', `${result.anime[0].start_date}`, true)
        .addField('End date', result.anime[0].end_date, true);
      message.channel.send({embed});
    })
    .catch(err =>{
      message.channel.send(`❌ Sorry but i can't find ${animename}.`)
      console.log(err);});
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: false,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'anime',
  description: '🔍 Searches for anime on MAL.',
  longDescription: "",
  usage: 'anime [name]'
};
