const Discord = module.require('discord.js');

module.exports.run = async(client, message, args) =>{

  if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.channel.send('You dont have permissions ya twat!');

    let userMute = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!userMute){
      let embed = new Discord.RichEmbed()
        .setTitle('Please specify any mentions.')
        .setColor("#f22a0c")

      message.channel.send({embed}).then(botmsg => {botmsg.delete(5000)})
      return
    }

  message.channel.overwritePermissions(userMute, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        })
    if(message.guild.channels.find('name', 'mod-log')){
      let embed = new Discord.RichEmbed()
        .setTitle(`${userMute.username} has been muted here! 🙊`)
        .setColor("#f22a0c")
        .setFooter('Mute', client.user.avatarURL)
        .setTimestamp(new Date());
      let embedmodlog = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTitle(`'${userMute.tag}' has been muted in '#${message.channel.name}' by '${message.author.tag}'! 🙊`)
        .setColor("#f22a0c")
        .setFooter('Mute', client.user.avatarURL)
        .setTimestamp(new Date());
      message.channel.send({embed}).then(botmsg => {botmsg.delete(5000)})
      message.delete(5000);
      message.guild.channels.find('name', 'mod-log').send({embed: embedmodlog})
    } else {
      let embed = new Discord.RichEmbed()
        .setTitle(`${userMute.username} has been muted here! 🙊`)
        .setColor("#f22a0c")
        .setFooter('Mute', client.user.avatarURL)
        .setTimestamp(new Date());
      message.channel.send({embed});
    }
}

exports.settings = {
  enabled: true,     
  public: true,
  PM: false,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'mute',
  description: '🙊 Mutes a mentioned user in the given channel.',
  longDescription: "",
  usage: 'mute [mention or ID]'
};
