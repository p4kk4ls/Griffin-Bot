const Discord = require('discord.js');

let guildID = '349630476496928769';
console.log('UGS assign Loaded');

module.exports = (client) => {
  client.on('message', message => {
    let messageAray = message.content.split(' | ');
    if (message.channel.type !== 'text') return;
    if (message.content.startsWith('~assign')){
      let title = messageAray[0].slice(7);
      let description = messageAray[1];
      let assignedUsersText = messageAray[2]

      if(!title) {
        message.channel.send('Pls add args thx :ok_hand:');
      }
      let embedAssign = new Discord.RichEmbed()
        .setAuthor(`${title} ᅠ`, 'https://cdn3.iconfinder.com/data/icons/illustricon-tech/512/task.board-512.png')  
        .setDescription(`${description}ᅠ`)
        .addField('Assigned Users', `${assignedUsersText}ᅠ`)
        .setColor('#0061ff')
        .setFooter(`Assigned by: ${message.author.tag}ᅠ`);
      message.guild.channels.find('name', 'work-assign').send({embed: embedAssign});
      message.guild.channels.find('name', 'assign-history').send({embed: embedAssign});
    }

  });
};