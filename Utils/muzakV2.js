const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

exports.run = (client, config) =>{
    
    client.on('message', (message) => {
        if(message.content.startsWith('~join')) {
            console.log(client)
            // var voiceChannel = client.VoiceConnections.find(val => val.channel.id = message.author.)
            message.member.VoiceChannel.join()
        }
    })
}

  
exports.settings = {
        enabled: true,     
        public: true
  };