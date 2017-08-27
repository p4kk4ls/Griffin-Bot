const Discord = require('discord.js');
const owStats = require('over-scrap');

exports.run = (client, message, args) =>{
  let battleTag = args[0];
  let region = args[1].toLowerCase();
  let gameMode = args[2].toLowerCase();
  let hero = args[3].toLowerCase();
  


 
  owStats.loadDataFromProfile(battleTag, region, gameMode)
    .then(stats => {


      let embed = new Discord.RichEmbed()
        .setAuthor(`Overwatch stats for ${battleTag} | ${heroname}`)
        .setDescription(`${game}`)
        .addField('Hero Specific', `${stats.heroesStats.Reinhardt.toString()}`,true)
        .addField('Hero Specific', `${stats.heroesStats.Reinhardt.toString()}`,true)
        .addField('Hero Specific', `${stats.heroesStats.Reinhardt.toString()}`,true)
        .addField('Hero Specific', `${stats.heroesStats.Reinhardt.toString()}`,true);
        

    });
};

exports.help = {
  name: 'owstats',
  description: '🔧 Shows stats for given mode and hero in Overwatch.',
  usage: 'owstats <BattleTag> <region> <casual | comp> <hero> <avg | best | total>'
};