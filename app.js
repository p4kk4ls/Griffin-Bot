const Discord = require('discord.js');
const client = new Discord.Client();

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

var nodeargs = process.argv.slice(2);

client.commands = new Discord.Collection


/**
 * Loads Everything in ./Utils/
 */
fs.readdir("./Utils", (err, files) =>{
  if(err) return console.error(err)
  let filesjs = files.filter(f => f.split(".").pop() === "js")
  if(filesjs <= 0){
      console.log('No Utils found!!')
      return
  }

  console.log(`\n┌──────────────────────────────────────┐\n|Im trying to load ${filesjs.length} utils, hold up!`)
  filesjs.forEach((f, i) => {
      require(`./Utils/${f}`)(process, client, config)
      console.log(`|${i + 1}: ${f} ready to fly!`)
  })
  console.log('└──────────────────────────────────────┘')
})


/**
 * Commmand Collection
 */
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
      console.log('└──────────────────────────────────────┘')
})

/**
 * Command Handler
 */
client.on('message', (message) =>{
  if (message.channel.type !== 'text') return;
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  let messageAray = message.content.split(' ');
  let command = messageAray[0];
  let args = messageAray.slice(1);

  let cmd = client.commands.get(command.slice(prefix.length))
  if(cmd) {
  cmd.run(client, message, args, config)
  console.log(`┌─────────────────────\n|${message.author.tag} used '${command} ${args}' in '${message.guild.name}'/'${message.channel.name}'\n└─────────────────────`);
  }
});

if(nodeargs[0] == '-testrun') {return 0;};

client.login(config.token);