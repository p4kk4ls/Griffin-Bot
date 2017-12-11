const Discord = require('discord.js')

module.exports.run = async(client, message, args) =>{
    let user = message.mentions.users.first() || message.author

    var userstatus = user.presence.status
    var userGame = user.presence.game
    if(userstatus == 'online'){var userstatus = "Online"}
    if(userstatus == 'offline'){var userstatus = "Offline"}
    if(userstatus == 'dnd'){var userstatus = "Do Not Disturb"}
    if(userstatus == 'idle'){var userstatus = "Idle/Away"}
    if(userGame){var userGame = userGame.name} else {var userGame = "ᅠ"}

    let embed = new Discord.RichEmbed()
      .setAuthor(`${user.tag}`, user.avatarURL)
      .setColor('#331dc4')
      .setThumbnail(user.avatarURL)
      .addField('Full Username', `${user.tag}`, true)
      .addField('User ID', `${user.id}`, true)
      .addField('Status', userstatus,true)
      .addField('Playing', `${userGame}　`,true)
      .addField(`Joined Discord`,user.createdAt)
    message.channel.send({embed});
    console.log(GetColour(user.avatarURL)+"nonfunc")
    return
}

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'profile',
  description: '🎫 Shows information about mentioned user.',
  longDescription: "",
  usage: 'profile [mention]'
};
