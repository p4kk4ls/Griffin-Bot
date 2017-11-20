const Discord = require('discord.js');

exports.run = (client, config) =>{
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
};

exports.help = {
  name:"Role deleted",
  description: "Triggered when role is deleted"
}

exports.settings = {
      enabled: true,     
      public: true,
};