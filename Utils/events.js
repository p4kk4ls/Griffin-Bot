const Discord = require('discord.js');

module.exports = (client, config) =>{
  onReady(process, client, config);
  roleDelete(client);
  roleCreated(client);
  guildBan(client);
  guildUnban(client);
  newGuildChannel(client);
  deletedGuildChannel(client);
  newGuildEmoji(client);
  newGuildMember(client);
  leftGuildMember(client);
};

function updateStatus(client){
  client.user.setPresence({ game: { name: `use ${config.prefix}help | Serving in: ${client.guilds.size} guilds!`, type: 0 } });
}

function onReady(process, client, config) {
  client.on('ready', () => {
    console.log(`┌──────────────────────────────────────────────────────────────────────────┐\n|${client.user.tag} is up in ${client.guilds.size} guilds, for ${client.users.size} users!\n|Flight started at ${new Date() }\n|Using Gbot by Pesky12!\n└──────────────────────────────────────────────────────────────────────────┘`);
    client.user.setPresence({ game: { name: `use ${config.prefix}help | Serving in: ${client.guilds.size} guilds!`, type: 0 } });
    let embed = new Discord.RichEmbed()
      .setTitle('I have been restarted')
      .setColor('#ff7700')
      .setFooter('Restart', client.user.avatarURL)
      .setTimestamp(new Date());
    client.channels.get('331072865707360258').send({ embed });
    console.log(`┌────────────────────┐\n|Took: ${process.uptime() } seconds!|\n└────────────────────┘`);
  });
  var nodeargs = process.argv.slice(2);
}

function guildCantReach(client) {
  client.on('guildUnavailable', (guild) => {
    let embed = new Discord.RichEmbed()
      .setTitle(`Guild '${guild.name}' not availible!`)
      .setColor('#ff7700')
      .setFooter('Probalby some servers on Discord side died i hope im not going to skype in 10 minutes oh boi!', client.user.avatarURL)
      .setTimestamp(new Date());
    client.channels.get ('331072865707360258').send({ embed });
  });
}

function onRoleUpdate(client) {
  client.on('roleUpdate', (oldRole, newRole) => {
    if(oldRole.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Role '${oldRole.name}/${newRole.name}' has been updated`)
        .setDescription('For more info check the audit log')
        .setColor(newRole.hexColor)
        .setTimestamp(new Date());
      oldRole.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

function roleDelete(client) {
  client.on('roleDelete', (role) => {
    if(role.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Role '${role.name}'(${role.id}) has been deleted!`)
        .setDescription('For more info check the audit log')
        .addField('Color', `${role.hexColor}`, true)
        .addField('Role Created at', `${role.createdAt}`)
        .setColor(role.hexColor)
        .setTimestamp(new Date());
      role.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

function roleCreated(client) {
  client.on('roleCreate', (role) => {
    if(role.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Role '${role.name}'(${role.id}) has been created!`)
        .setDescription('For more info check the audit log')
        .addField('Color', `${role.hexColor}`, true)
        .setColor(role.hexColor)
        .setTimestamp(new Date());
      role.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

function guildBan(client) {
  client.on('guildBanAdd', (guild, user) => {
    if(user.bot)
      return;
    if(guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${user.tag} has been banned!`, user.avatarURL)
        .setDescription('For more info check the audit log')
        .setColor('#c4350d')
        .setFooter('Ban', client.user.avatarURL)
        .setTimestamp(new Date());
      guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

function guildUnban(client) {
  client.on('guildBanRemove', (guild, user) => {
    if(guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`${user.name} has been unbanned!`, user.avatarURL)
        .setDescription('For more info check the audit log')
        .setColor('#c4350d')
        .setFooter('Ban', client.user.avatarURL)
        .setTimestamp(new Date());
      guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

function newGuildChannel(client) {
  client.on('channelCreate', (channel) => {
    if(channel.type == 'dm')
      return;
    if(channel.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Channel #${channel.name}(${channel.id}) has been created!`)
        .setDescription('For more info check the audit log')
        .addField('Type', `${channel.type }`)
        .setColor('#c4350d')
        .setFooter('Channel', client.user.avatarURL)
        .setTimestamp(new Date());
      channel.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

function channelUpdated(client) {
  client.on('channelUpdate', (oldChannel, newChannel) => {
    if(newChannel.type == 'dm')
      return;
    if(oldChannel.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Channel #${oldChannel.name} | #${newChannel.name} has been updated!`)
        .setDescription('For more info check the audit log')
        .addField('Type', `${oldChannel.type }`, true)
        .addField('ID', `${oldChannel.id}`, true)
        .setColor('#c4350d')
        .setFooter('Channel', client.user.avatarURL)
        .setTimestamp(new Date());
      oldChannel.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

function deletedGuildChannel(client) {
  client.on('channelDelete', (channel) => {
    if(channel.type == 'dm')
      return;
    if(channel.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor(`Channel #${channel.name}(${channel.id}) has been deleted!`)
        .setDescription('For more info check the audit log')
        .addField('Type', `${channel.type }`)
        .setColor('#c4350d')
        .setFooter('Channel', client.user.avatarURL)
        .setTimestamp(new Date());
      channel.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

function newGuildEmoji(client) {
  client.on('emojiCreate', (emoji) => {
    if(emoji.guild.channels.find('name', 'mod-log')) {
      let embed = new Discord.RichEmbed()
        .setAuthor('Emoji has been created!')
        .setDescription(`${emoji}\nFor more info check the audit log`)
        .setColor('#c4350d')
        .setThumbnail(emoji.url)
        .setFooter('Emoji', client.user.avatarURL)
        .setTimestamp(new Date());
      emoji.guild.channels.find('name', 'mod-log').send({ embed });
    }
    else {
      return;
    }
  });
}

/*Called when user leaves the guild*/
function leftGuildMember(client) {
  client.on('guildMemberRemove', (member) => {
    let embed = new Discord.RichEmbed()
      .setAuthor(`${member.user.username} just left.`, member.user.displayAvatarURL)
      .setDescription('👋 Did we say something wrong?')
      .setColor('#c4350d');
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
}

function newGuildMember(client) {
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
}

function debugWarn(client) {
  client.on('warn', (warn) => {
    let embed = new Discord.RichEmbed()
      .setTitle('DISCORD API WARN')
      .setDescription('Log', warn)
      .setColor('#ff7700')
      .setFooter('warn')
      .setTimestamp(new Date());
    client.channels.get ('331072865707360258').send({ embed });
  });
}

function debugMessages(client) {
  client.on('debug', (debug) => {
    let embed = new Discord.RichEmbed()
      .setTitle('DISCORD API WARN')
      .setDescription('Log', debug)
      .setColor('#ff7700')
      .setFooter('DEBUG SPAM BOI!!!!')
      .setTimestamp(new Date());
    client.channels.get ('331072865707360258').send({ embed });
  });
}

