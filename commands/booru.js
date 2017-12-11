const Discord = require('discord.js');
exports.run = async(client, message, args) =>{
  if(message.channel.nsfw){ console.log("booru"); var booru = require('booru') } else { console.log('sfwbooru'); var booru = require('sfwbooru') }
  let site = args[0];
  let tags = args.slice(1);
  if(args.length < 1) {
    let embed = new Discord.RichEmbed()
      .setTitle('Please specify a booru and tags!')
      .setDescription('Use |~help booru| for extended info about tags and sites.')
      .setColor('#42b0f4')
      .setFooter('Invalid Input', client.user.avatarURL);
    message.channel.send({embed});
    return;
  }

  await booru.search(site, tags, {limit: 1, random: true})
    .catch(err => {         
      if(err.message.startsWith("Site not supported")) {
          let embed = new Discord.RichEmbed()
          .setTitle(`Site is not supported here!!`)
          .setColor('#c83fff');
        message.channel.send({embed});
        return;
      }
    })
    .then(booru.commonfy)
    .then(images => {
      for (let image of images) {
        message.channel.startTyping();
        console.log(image.common.rating)
        let embed = new Discord.RichEmbed()
            .addField('Rating:', `${image.common.rating}`, true)
            .addField('Score:', `${image.common.score}`, true)
            .setImage(image.common.file_url)
            .setColor('#c83fff')
            .setFooter(`${site} | Tags: ${args.slice(1).join(' ')}`);
          message.channel.send({embed});
          message.channel.stopTyping();
      }
    })
    .catch(err => {
      console.log(err)
      if (err.name === 'booruError') {
        client.channels.get('333727164937666562').send({embed});
        if(err.message.startsWith('Site not ')) {
          let embed = new Discord.RichEmbed()
            .setTitle(`${err.message}`)
            .setColor('#c83fff')
          message.channel.send({embed});
          return;
        }
        if(err.message.startsWith('You didn\'t give ')) {
          let embed = new Discord.RichEmbed()
            .setTitle(`I can find nothing with these tags: *${tags.join(' ')}*`)
            .setColor('#c83fff');
          message.channel.send({embed});
          return;
        }
      }
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
  name: 'booru',
  description: '🔍 Searches specified booru. (NSFW sites enabled/NSFW channels only).',
  longDescription: "",
  usage: 'booru [site] [tags] \nSupported sites and aliases (NSFW site list sfw are supported as well):\n e621.net | e6\ndanbooru.donmai.us | db\nrule34.xxx | r34\n rule34.paheal.net | paheal\n derpibooru.org | derp\n For better understanding of tag system read \'http://e926.net/help/tags\''
};
