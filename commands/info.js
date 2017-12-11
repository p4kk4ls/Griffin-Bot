const Discord = require('discord.js');
exports.run = async(client, message) =>{
  let invitelink = await client.generateInvite(8)
  let embed = new Discord.RichEmbed()
    .setTitle(`Infoboard for ${client.user.username}`)
    .setDescription('Here is some info about this bot!!')
    .addField('Uptime', `${client.uptime} Miliseconds`,true)
    .addField('Code Creator', client.users.get('235047463017381888').tag, true)
    .addField('Repo', 'https://bitbucket.org/Peskyn12/griffin-bot')
    .addField('Invite me!!', invitelink)
    .setColor('#7f16ff')
    .setThumbnail(client.users.get('235047463017381888').avatarURL);
  message.channel.send({embed});
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
};

exports.help = {
  name: 'info',
  description: '🔧 Shows info about the bot! :3',
  usage: 'info'
};
