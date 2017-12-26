const Discord = require('discord.js');
const urban = require('relevant-urban');
exports.run = (client, message, args) =>{
  if(!args[0]){
    urban.random().then(urbaned =>{
      const embed = new Discord.RichEmbed()
        .setAuthor(`Random urban of "${urbaned.word}"`)
        .setDescription(urbaned.definition)
        .setColor('#17b3d6')
        .addField('Example', urbaned.example)
        .setFooter(`${urbaned.urbanURL} | Likes: ${urbaned.thumbsUp} | Dislikes: ${urbaned.thumbsDown}`);
      message.channel.send({embed});
    });
    return;
  }

  let toUrban = args.join(' '); 
  urban(toUrban).then(urbaned =>{
    const embed = new Discord.RichEmbed()
      .setAuthor(`Urban of "${urbaned.word}"`)
      .setDescription(urbaned.definition)
      .setColor('#17b3d6')
      .addField('Example', `${urbaned.example}.`)
      .setFooter(`${urbaned.urbanURL} | Likes: ${urbaned.thumbsUp} | Dislikes: ${urbaned.thumbsDown}`);
    message.channel.send({embed});
  })
    .catch(err =>{
      let Searching = new Discord.RichEmbed()
        .setAuthor(`I can't find ${args}!!`,'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-128.png')
        .setColor('#c40101');
      message.channel.send({embed: Searching});
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
  name: 'urban',
  description: '🔧 Searches for a word/sentence on "Urban Dictionary"',
  longDescription: "",
  usage: 'urban [word | sentence]'
};
