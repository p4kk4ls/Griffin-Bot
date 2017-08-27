const Discord = require('discord.js');

const serverID = '264322700451774464';

console.log('lol');

module.exports = (client) => {
  client.on('message', (message) => {
    let helpRole = message.guild.roles.get('name', 'help');

    if (message.guild.id !== serverID) return;
    if(message.content.startsWith('p~nsfw')){
      const modLog = new Discord.RichEmbed()
        .setDescription('Request for access to #nsfw-artwork')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor('#ff5d00')
        .setTimestamp(new Date());
      message.channel.send('Request sent to moderators now you just have to wait.');
      message.guild.channels.find('name', 'mod-log').send({embed: modLog});
      message.guild.channels.find('name', 'mod-log').send('<@&325577098573905922>').then(botmsg => botmsg.delete());     
    }
  });
};
