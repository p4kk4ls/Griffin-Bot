const Discord = require('discord.js');

exports.run = (client, message, args, config) => {
  if (!args[0]) {
    const commandNames = Array.from(client.events.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`\`Use ${config.prefix}help <command> for more info!}\n\n\` \`\`\`${client.events.map(c => `Public: ${c.settings.public} ${c.settings.public} ${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} || ${c.help.description}`).join('\n')}\`\`\``);
  } else {
    let command = args[0];
    if (client.events.has(command)) {
      command = client.events.get(command);
      let embed = new Discord.RichEmbed()
        .setAuthor('~' + command.help.name)
        .setDescription(command.help.description)
        .addField('Usage', command.help.usage);
        
      message.channel.send({embed});
    }
  }
};

exports.settings = {
    enabled: false,     
    public: false,
  };

exports.help = {
  name: 'events',
  description: '❔ Displays all the available commands. Duh!',
  usage: 'help [command]'
};
