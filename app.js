const Discord = require('discord.js');
const client = new Discord.Client({    disableEveryone:true,  });

const fs = require('fs');

if (fs.existsSync('./config-local.json')) {
    var config = require('./config-local.json');
    console.log('Detected Local Config')
} else {
    var config = require('./config-server.json');
    console.log('Detected Server Config')
}

const prefix = config.prefix;

console.log(process.uptime())

require('./Utils/events.js')(client, config)
require('./Utils/onMessage.js')(client, config)
require('./Utils/require.js')(client, config)

client.commands = new Discord.Collection

fs.readdir("./commands/", (err, files) =>{
    if(err) return console.error(err)
    let filesjs = files.filter(f => f.split(".").pop() === "js")
    if(filesjs <= 0){
        console.log('No commands to load mate!')
        return
    }

    console.log(`\n┌──────────────────────────────────────┐\n|Im trying to load ${filesjs.length} commands, hold up!`)
    filesjs.forEach((f, i) => {
        let file = require(`./commands/${f}`)
        console.log(`|${i + 1}: ${f} ready to fly!`)
        client.commands.set(file.help.name, file);
    })
})


client.on('message', async (message) => {
  if (message.channel.type !== 'text') return;
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  let messageAray = message.content.split(' ');
  let command = messageAray[0];
  let args = messageAray.slice(1);

  let cmd = client.commands.get(command.slice(prefix.length))
  if(cmd) {
  cmd.run(client, message, args, config)
  console.log(`┌─────────────────────\n|${message.author.tag} used '${command} ${args}' in '${message.guild.name}'/'${message.channel.name}'\n└─────────────────────`)
  let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setDescription(`\n|${message.author.tag} used '${command} ${args}' in '${message.guild.name}'/'${message.channel.name}'\n`)
      .setColor('#ff7700')
      .setFooter('Logging', client.user.avatarURL)
      .setTimestamp(new Date());
  client.channels.get("331748531981516800").send({embed});
  }
});

client.login(config.token);
