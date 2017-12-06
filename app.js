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
client.commandsHidden = new Discord.Collection
client.events = new Discord.Collection
client.commandsDisabled = new Discord.Collection


/**
 * Loads Everything in ./Events/
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

    if(file.settings.enabled == true){
        console.log(`|${i + 1}: ${f} ready to fly!`)
        file.run(client, config)
        if(file.settings.public == true){
            client.events.set(file.help.name, file);
        }
    } else {
        console.log(`|${i + 1}: ${f} is disabled!`)
    }
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
        require(`./Utils/${f}`)(client, config)
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

        if(file.settings.enabled == false) { 
            client.commandsDisabled.set(file.help.name, file)
            console.log(`|${i + 1}: ${f} is disabled!`)
            return
        }
        console.log(`|${i + 1}: ${f} ready to fly!`)
        if(file.settings.public == false){
            client.commandsHidden.set(file.help.name, file);
            return
        }
        client.commands.set(file.help.name, file);
    })
      console.log('└──────────────────────────────────────┘')
})

/**
 * Command Handler
 */
client.on('message', (message) =>{
//   if (message.channel.type !== 'text') return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let messageAray = message.content.split(' ');
  let command = messageAray[0];
  let args = messageAray.slice(1);
  let cmd = client.commands.get(command.slice(prefix.length))
  let cmdHidden = client.commandsHidden.get(command.slice(prefix.length))

  if(cmd) {
    if(cmd.settings.PM == false & message.channel.type !== 'text') return message.channel.send("This command is not allowed in PMs!!").then(message => message.delete(5000));
    cmd.run(client, message, args, config)
  }
  if(cmdHidden){
      if(message.author.id !== config.ownerID) return;
    cmdHidden.run(client, message, args, config)
  }
});

if(testrun == true) return 0;


client.login(config.token);
