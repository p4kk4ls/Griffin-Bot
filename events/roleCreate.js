const Discord = require('discord.js');

exports.run = (client, config) =>{
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
};

exports.help = {
  name:"Role created",
  description: "Triggered when role is created"
}

exports.settings = {
      enabled: true,     
      public: true,
};