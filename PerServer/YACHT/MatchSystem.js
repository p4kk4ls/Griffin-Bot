const Discord = require('discord.js');
var serverID = '348005882329694208';

module.exports = (client) => {
  console.log('Match system loaded');
  client.on('message', message => {
    if (message.channel.type !== 'text') return;
    if (message.guild.id !== serverID) return;
    let messageAray = message.content.split(' ');
    let args = messageAray.slice(1);

    if(message.content.startsWith('~match')){
      if(!args) return message.channel.send('Nice args mate!!!');
      if(args == 'help'){message.channel.send('Help: ~match [month] [day] [hour] [minute] | [Map] | [Custom note] | [Custom HEX color] | [Custom thumbnail]'); return}

      let split = message.content.split(' | ');
      var map = split[1];
      var description = split[2];
      var color = split[3];
      var thumbnail = split[4];

      if(!map){
        map = 'Not decided';
      }
      if(!description){
        description = 'Please tell your team captain or mods if you can\'t make it';
      }
      if(!color){
        color = '#2176ff';
      }
      if(!thumbnail){
        thumbnail = 'https://wiki.teamfortress.com/w/images/0/06/Competitive_logo_laurel.png?t=20160305050153';
      }
      
      console.log(args)
        
      var day = args[0];
      var month = args[1] - 1;
      var hours = args[2];
      var minutes = args[3];
      var time = new Date(2017, month, day, hours, minutes);
      console.log(time)
      if(time == 'Invalid Date') return message.channel.send('Invalid date/time!!!').then(botmsg =>{botmsg.delete(5000);});

      var matchEmbed = new Discord.RichEmbed()
        .setAuthor('Scheduled match', 'http://orig12.deviantart.net/e2aa/f/2015/225/c/5/team_fortress_2_icon__metro_style__by_designsnext-d95i6qv.png')
        .setDescription(`${description}`)
        .addField('Match time and date', time, true)
        .addField('Map',`${map}`, true)
        .setThumbnail(thumbnail)
        .setColor(color)
        .setFooter(`Match added by: ${message.author.tag}(${message.member.id})`);
      message.guild.channels.find('name', 'matches').send('@here').then(botmsg =>{botmsg.delete()});
      message.guild.channels.find('name', 'matches').send({embed: matchEmbed});

    }
  });
};
