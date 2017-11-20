const Discord = require('discord.js');

exports.run = (client, config) =>{
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
};

exports.help = {
  name:"Role Updated",
  description: "Triggered when role's perms, name, etc has been chanaged"
}

exports.settings = {
      enabled: true,     
      public: true,
};