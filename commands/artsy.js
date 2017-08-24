const Discord = require('discord.js');
const Artsy = require('artsy');

exports.run = (client, message, args) =>{
  var client = new Artsy({ token: 'd2bcf4ba5854949f579ea15f268731ee' });
    
  client.artists.get('leonardo', function (err, artist) {
    console.dir(artist); // Abstract expressionism ftw 
  });
};

exports.help = {
  name: 'artsy',
  description: '🔧 Shows info about the bot! :3',
  usage: 'info'
};
