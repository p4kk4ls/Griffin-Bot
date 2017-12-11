const Discord = require('discord.js');

exports.run = (client, message, args, config) => {
  if (!args[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`\`Use ${config.prefix}help <command> for more info!}\n\n\` \`\`\`${client.commands.map(c => `${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} || ${c.help.description}`).join('\n')}\`\`\``);
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      let embed = new Discord.RichEmbed()
        .setAuthor(config.prefix + command.help.name)
        .setDescription(command.help.description)
        .addField('Usage', command.help.usage);
        
      message.channel.send({embed});
    }
  }
};

exports.settings = {
  enabled: true,     
  public: true,
  pm: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'help',
  description: '❔ Displays all the available commands. Duh!',
  longDescription: "",
  usage: 'help [command]'
};
