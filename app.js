const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const dotenv = require('dotenv')
const config = require('./config.json')

if (process.env.RUN_TYPE !== 'production') {
  dotenv.load()
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

Loader('./commands/', client.commands)
Loader('./events/', client.events, true)
Loader('./Utils/', false, true)

client.on('message', (message) => {
  let prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  if (message.author.bot) return
  let messageAray = message.content.split(' ')
  let command = messageAray[0]
  let args = messageAray.slice(1)
  let cmd = client.commands.get(command.slice(prefix.length))

  if (cmd) {
    if (cmd.settings.permissionsRequired[0] && !message.guild.member(message.author).hasPermission(cmd.settings.permissionsRequired[0])) return message.channel.send('You don\'t have perms.')
    if (cmd.settings.PM === false & message.channel.type !== 'text') return message.channel.send('This command is not allowed in PMs!!')
    cmd.run(client, message, args, config)
  }
})

function Loader (loadFolder, collection, requiring) {
  fs.readdir(loadFolder, (err, files) => {
    if (err) return console.error(err)
    let filesjs = files.filter(f => f.split('.').pop() === 'js')
    if (filesjs <= 0) {
      console.log('No commands to load mate!')
      return
    }
    console.log(`\n──────────────────────────────────────\n>I am trying to load ${filesjs.length} files from ${loadFolder}, hold up!`)
    filesjs.forEach((f, i) => {
      let file = require(`${loadFolder}${f}`)
      if (file.settings.enabled === false) {
        console.log(`${i + 1}: ${f} is disabled and will not be loaded`)
        return
      }
      if (requiring === true) file.run(client, config)
      console.log(`${i + 1}: ${f} ready to fly!`)
      if (collection !== false) collection.set(file.help.name, file)
    })
    console.log('──────────────────────────────────────')
  })
}

client.login(config.token)
