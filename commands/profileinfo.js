const Discord = require('discord.js')

module.exports.run = async(client, message, args) =>{
    let user = message.mentions.users.first() || message.author

    var userstatus = user.presence.status
    if(userstatus == 'online'){var userstatus = "Online"}
    if(userstatus == 'offline'){var userstatus = "Offline"}
    if(userstatus == 'dnd'){var userstatus = "Do Not Disturb"}
    if(userstatus == 'idle'){var userstatus = "Idle/Away"}

    let embed = new Discord.RichEmbed()
      .setAuthor(`${user.tag}`, user.avatarURL)
      .setColor('#331dc4')
      .setThumbnail(user.avatarURL)
      .addField('Full Username', `${user.tag}`, true)
      .addField('User ID', `${user.id}`, true)
      .addField('Status', userstatus,true)
      .addField(`Joined Discord`,user.createdAt)
    message.channel.send({embed});
    return
}
exports.help = {
  name: 'profile',
  description: '🎫 Shows information about mentioned user.',
  usage: 'profile [mention]'
};