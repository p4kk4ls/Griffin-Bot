const Discord = require('discord.js');

exports.run = (client, config) =>{
  client.on('guildMemberAdd', (member) => {
    var greetings;
    if(member.user.id == '252890173820370945') {
      greetings = 'Welcome our god Erin';
    }
    else if(member.user.id == '235047463017381888') {
      greetings = 'Pesky bird just landed here!!';
    }
    else {
      var randomGreetings =[
        `Swoooosh. ${member.user.tag} just landed.`,
        `Brace yourselves. ${member.user.tag} just joined the server.`,
        `${member.user.tag} just joined. Hide your bananas.`,
        `${member.user.tag} just arrived. Seems OP - please nerf.`,
        `${member.user.tag} just slid into the server.`,
        `A ${member.user.tag} has spawned in the server.`,
        `Big ${member.user.tag} showed up!`,
        `Where’s ${member.user.tag}? In the server!`,
        `${member.user.tag} hopped into the server. Kangaroo!!`,
        `${member.user.tag} just showed up. Hold my beer.`,
        `${member.user.tag} just joined the server - glhf!`,
        `${member.user.tag} just joined. Everyone, look busy!`,
        `${member.user.tag} just joined. Can I get a heal?`,
        `${member.user.tag} joined your party.`,
        `${member.user.tag} joined. You must construct additional pylons.`,
        `Ermagherd. ${member.user.tag} is here.`,
        `Welcome, ${member.user.tag}. Stay awhile and listen.`,
        `Welcome, ${member.user.tag}. We were expecting you ( ͡° ͜ʖ ͡°)`,
        `Welcome, ${member.user.tag}. We hope you brought pizza.`,
        `Welcome ${member.user.tag}. Leave your weapons by the door.`,
        `A wild ${member.user.tag} appeared.`,
        `Welcome ${member.user.tag}!Sit by the fire and enjoy the fireworks.`,
        `55 to our server ${member.user.tag}`,
        `${member.user.tag} is too OP pls nerf`,
        `${member.user.tag} suddenly teleported here!`
      ];
      var randomNumber = Math.floor(Math.random() * randomGreetings.length);
      greetings = randomGreetings[randomNumber];
    }
    let embed = new Discord.RichEmbed()
      .setAuthor(greetings, member.user.displayAvatarURL)
      .setColor('#1bbc12');
    if (member.guild.channels.find('name', 'general')) {
      member.guild.channels.find('name', 'general').send({ embed });
      return;
    }
    if (member.guild.defaultChannel) {
      member.guild.defaultChannel.send({ embed });
      return;
    }
    if (member.guild.channels.find('name', 'mod-log')) {
      member.guild.channels.find('name', 'mod-log').send({ embed });
      return;
    }
    else
      return;
  });
};

  exports.settings = {
    name: '',
    enabled: false,
  };