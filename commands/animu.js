
const Discord = require('discord.js');
const mal = require('MALjs');
const he = require('he');

exports.run = async(client, message, args, config) =>{
  var api = new mal(config.MALlogin, config.MALpass);
  if (args.length < 1){ 
    let embed = new Discord.RichEmbed()
      .setTitle('What anime i should find?')
      .setColor('#d15b12');
    await message.channel.send({embed});

     var textRecived = await message.channel.awaitMessages(m => message.author.id == m.author.id, {time: 20000, max: 1})

     var animename = textRecived.first().content
     console.log(args)
  } else {
    let animename = args.join(' ');
  }
  console.log (animename);
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
      let Searching = new Discord.RichEmbed()
        .setAuthor(`I can't find ${args}!!`,'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-128.png')
        .setDescription('Try to be more specific.')
        .setColor('#c40101');
      message.channel.send({embed: Searching})
      console.log(err);});
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: false,
};

exports.help = {
  name: 'anime',
  description: '🔍 Searches for animu.',
  usage: 'anime [name]'
};
