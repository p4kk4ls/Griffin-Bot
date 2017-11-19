const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
var nodeArgs = process.argv.slice(2)

if (fs.existsSync('./config-local.json')) {
    var config = require('./config-local.json');
    console.log('Detected Local Config')
} else {
    var config = require('./config-server.json');
    console.log('Detected Server Config')
}

switch(nodeArgs[0]) {
    case '-testrun':
        var testrun = true;
        console.log("RUNNING WITH -test!!!!")
        break; 
    case '-dev':
        var config = require('./config-local.json');
        console.log("RUNNING WITH -dev!!!!")
        break;
    case '-main':
        var config = require('./config-server.json');
        console.log("RUNNING WITH -main!!!!")
        break;
}

const prefix = config.prefix;

console.log(process.uptime())

client.commands = new Discord.Collection


/**
 * Loads Everything in ./Utils/
 */
fs.readdir("./events", (err, files) =>{
  if(err) return console.error(err)
  let filesjs = files.filter(f => f.split(".").pop() === "js")
  if(filesjs <= 0){
      console.log('No Events found!!')
      return
  }

  console.log(`\n┌──────────────────────────────────────┐\n|I am trying to load ${filesjs.length} events, hold up!`)
  filesjs.forEach((f, i) => {
    let file = require(`./events/${f}`)
    console.log(`|${i + 1}: ${f} ready to fly!`)
    file.run(client, config)
  })
  console.log('└──────────────────────────────────────┘')
})

fs.readdir("./Utils", (err, files) =>{
    if(err) return console.error(err)
    let filesjs = files.filter(f => f.split(".").pop() === "js")
    if(filesjs <= 0){
        console.log('No Utils found!!')
        return
    }
  
    console.log(`\n┌──────────────────────────────────────┐\n|I am trying to load ${filesjs.length} utils, hold up!`)
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

    console.log(`\n┌──────────────────────────────────────┐\n|I am trying to load ${filesjs.length} commands, hold up!`)
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

if(testrun == true) return 0;

client.login(config.token);
