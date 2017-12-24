const Discord = require('discord.js')
const Jimp = require('jimp')
const awaitInput = require('../Utils/inputAway')

exports.run = async(client, message, args) => {
  let rip = args.join(' ');

  if (args.length < 1){ 
    rip = await awaitInput.run(message, 8000, 1, m => m.author.id == message.author.id)
    rip =  rip.first().content
    console.log(rip)
  }


  message.channel.startTyping();
  Jimp.read('https://www.minecraftskinstealer.com/achievement/a.php?i=1&h=Achievement+get%21&t=', function (err, image) {
    Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function (font) {
      image.print(font, 59, 32, rip);
      image.write(`../img/achiv${message.author.id}.png`, function() {
        message.channel.send({file: `../img/achiv${message.author.id}.png`})
        message.channel.stopTyping()
       }
      )
    })
    if (err) throw err;
  });

};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'achiev',
  description: '🏆 Generates a Minecraft style achievement!',
  longDescription: "",
  usage: 'achiev [text]',
};