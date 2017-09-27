const Discord = require('discord.js');

module.exports = (client, config) =>{
  client.on('ready', () => {
    console.log(`└──────────────────────────────────────┘\n\n┌──────────────────────────────────────────────────────────────────────────┐\n|${client.user.tag} is up in ${client.guilds.size} guilds, for ${client.users.size} users!\n|Flight started at ${new Date()}\n|Using Gbot by Pesky12!\n└──────────────────────────────────────────────────────────────────────────┘`);
    // client.user.setGame(`use ${prefix}help | Serving in: ${client.guilds.size} guilds!`);
    client.user.setPresence({ game: { name: `use ${config.prefix}help | Serving in: ${client.guilds.size} guilds!`, type: 0 } });
    let embed = new Discord.RichEmbed()
      .setTitle('I have been restarted')
      .setColor('#ff7700')
      .setFooter('Restart', client.user.avatarURL)
      .setTimestamp(new Date());
    client.channels.get('331072865707360258').send({embed});
    console.log(`┌────────────────────┐\n|Took: ${process.uptime()} seconds!|\n└────────────────────┘`);
  });

  // client.on('guildUnavailable', (guild)=>{
  //   let embed = new Discord.RichEmbed()
  //     .setTitle(`Guild '${guild.name}' not availible!`)
  //     .setColor('#ff7700')
  //     .setFooter('Probalby some servers on Discord side died i hope im not going to skype in 10 minutes oh boi!', client.user.avatarURL)
  //     .setTimestamp(new Date());
  //   client.channels.get('331072865707360258').send({embed});
  // });

  // client.on('roleUpdate', (oldRole, newRole) => {
  //   if (oldRole.guild.channels.find('name', 'mod-log')) {
  //     let embed = new Discord.RichEmbed()
  //       .setAuthor(`Role '${oldRole.name}/${newRole.name}' has been updated`)
  //       .setDescription('For more info check the audit log')
  //       .setColor(newRole.hexColor)
  //       .setTimestamp(new Date());
  //     oldRole.guild.channels.find('name', 'mod-log').send({embed});
  //   } else {
  //     return;
  //   }
  // });

  client.on('roleDelete', (role) => {
    if (role.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Role '${role.name}'(${role.id}) has been deleted!`)
        .setDescription('For more info check the audit log')
        .addField('Color', `${role.hexColor}`, true)
        .addField('Role Created at', `${role.createdAt}`)
        .setColor(role.hexColor)
        .setTimestamp(new Date());
      role.guild.channels.find('name', 'mod-log').send({embed});
    } else {
      return;
    }
  });

  // client.on('roleCreate', (role) => {
  //   if (role.guild.channels.find('name', 'mod-log')) {
  //     let embed = new Discord.RichEmbed()
  //       .setAuthor(`Role '${role.name}'(${role.id}) has been created!`)
  //       .setDescription('For more info check the audit log')
  //       .addField('Color', `${role.hexColor}`, true)
  //       .setColor(role.hexColor)
  //       .setTimestamp(new Date());
  //     role.guild.channels.find('name', 'mod-log').send({embed});
  //   } else {
  //     return;
  //   }
  // });

  client.on('guildBanAdd', (guild, user) => {
    if (user.bot) return;
    if (guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${user.tag} has been banned!`, user.avatarURL)
        .setDescription('For more info check the audit log')
        .setColor('#c4350d')
        .setFooter('Ban', client.user.avatarURL)
        .setTimestamp(new Date());
      guild.channels.find('name', 'mod-log').send({embed});
    } else {
      return;
    }
  });

  client.on('guildBanRemove', (guild, user) => {
    if (guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${user.name} has been unbanned!`, user.avatarURL)
        .setDescription('For more info check the audit log')
        .setColor('#c4350d')
        .setFooter('Ban', client.user.avatarURL)
        .setTimestamp(new Date());
      guild.channels.find('name', 'mod-log').send({embed});
    } else {
      return;
    }
  });

  client.on('channelCreate', (channel) => {
    if(channel.type == 'dm') return;
    if (channel.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Channel #${channel.name}(${channel.id}) has been created!`)
        .setDescription('For more info check the audit log')
        .addField('Type', `${channel.type}`)
        .setColor('#c4350d')
        .setFooter('Channel', client.user.avatarURL)
        .setTimestamp(new Date());
      channel.guild.channels.find('name', 'mod-log').send({embed});
    } else {
      return;
    }
  });

  // client.on('channelUpdate', (oldChannel, newChannel) => {
  //   if(newChannel.type == 'dm') return;
  //   if (oldChannel.guild.channels.find('name', 'mod-log')) {
  //     let embed = new Discord.RichEmbed()
  //       .setAuthor(`Channel #${oldChannel.name} | #${newChannel.name} has been updated!`)
  //       .setDescription('For more info check the audit log')
  //       .addField('Type', `${oldChannel.type}`,true)
  //       .addField('ID', `${oldChannel.id}`,true)
  //       .setColor('#c4350d')
  //       .setFooter('Channel', client.user.avatarURL)
  //       .setTimestamp(new Date());
  //     oldChannel.guild.channels.find('name', 'mod-log').send({embed});
  //   } else {
  //     return;
  //   }
  // });

  client.on('channelDelete', (channel) => {
    if(channel.type == 'dm') return;
    if (channel.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Channel #${channel.name}(${channel.id}) has been deleted!`)
        .setDescription('For more info check the audit log')
        .addField('Type', `${channel.type}`)
        .setColor('#c4350d')
        .setFooter('Channel', client.user.avatarURL)
        .setTimestamp(new Date());
      channel.guild.channels.find('name', 'mod-log').send({embed});
    } else {
      return;
    }
  });



  client.on('emojiCreate', (emoji) => {
    if (emoji.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor('Emoji has been created!')
        .setDescription(`${emoji}\nFor more info check the audit log`)
        .setColor('#c4350d')
        .setThumbnail(emoji.url)
        .setFooter('Emoji', client.user.avatarURL)
        .setTimestamp(new Date());
      emoji.guild.channels.find('name', 'mod-log').send({embed});
    } else {
      return;
    }
  });


  client.on('guildMemberRemove', (member) => {
    let embed = new Discord.RichEmbed()
      .setAuthor(`${member.user.username} just left.`, member.user.displayAvatarURL)
      .setDescription('👋 Did we say something wrong?')
      .setColor('#c4350d');
    if (member.guild.channels.find('name', 'general')){
      member.guild.channels.find('name', 'general').send({embed});
      return;
    }
    if (member.guild.defaultChannel){
      member.guild.defaultChannel.send({embed});
      return;
    }
    if (member.guild.channels.find('name', 'mod-log')){
      member.guild.channels.find('name', 'mod-log').send({embed});
      return;
    }
    else return;
  });

  client.on('guildMemberAdd', (member) => {
    var randomGreetings = [
      `Welcome ${member.user.tag}! Sit by the fire and enjoy the fireworks.`,
      `55 to our server ${member.user.tag}`,
      `${member.user.tag} is too OP pls nerf`,
      `${member.user.tag} suddenly teleported here!`
    ];
    var randomNumber = Math.floor(Math.random()*randomGreetings.length);
  
  
    let embed = new Discord.RichEmbed()
      .setAuthor(randomGreetings[randomNumber], member.user.displayAvatarURL)
      .setColor('#1bbc12');
    if (member.guild.channels.find('name', 'general')){
      member.guild.channels.find('name', 'general').send({embed});
      return;
    }
    if (member.guild.defaultChannel){
      member.guild.defaultChannel.send({embed});
      return;
    }
    if (member.guild.channels.find('name', 'mod-log')){
      member.guild.channels.find('name', 'mod-log').send({embed});
      return;
    }
    else return;
  });

  client.on('warn', (warn)=>{
    let embed = new Discord.RichEmbed()
      .setTitle('DISCORD API WARN')
      .setDescription('Log', warn)
      .setColor('#ff7700')
      .setFooter('warn')
      .setTimestamp(new Date());
    client.channels.get('331072865707360258').send({embed});
  });

  //BETTER NOT LOL
  // client.on('debug', (debug)=>{
  //   let embed = new Discord.RichEmbed()
  //       .setTitle('DISCORD API WARN')
  //       .setDescription('Log', debug)
  //       .setColor('#ff7700')
  //       .setFooter('DEBUG SPAM BOI!!!!')
  //       .setTimestamp(new Date());
  //   client.channels.get("331072865707360258").send({embed});
  // })
  // surprise(sendBdayMessage);

  // function sendBdayMessage(){
  //   var Bdayembed = new Discord.RichEmbed()
  //     .setAuthor('Happy birtday Pesky!!')
  //     .setFooter('this is the most depressing function i ever did');
  //   client.channels.get('351459309928054794').send({embed: Bdayembed});
  //   console.log("i have a sad life")
  // }

  // function surprise(cb) {
  //   (function loop() {
  //     var now = new Date();
  //     if (now.getDate() === 27 && now.getMonth() === 9 && now.getHours() === 22 && now.getMinutes() === 13) {
  //       cb();
  //     }
  //     console.log('lol nope');
  //     now = new Date();
  //     var delay = 60000 - (now % 60000);
  //     setTimeout(loop, delay);
  //   })();
  // }
};
