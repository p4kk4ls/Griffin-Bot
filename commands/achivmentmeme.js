const Discord = require('discord.js')
const Jimp = require('jimp')
const awaitInput = require('../Utils/inputAway')
const throwError = require('../Utils/throwError')

exports.run = async(client, message, args) => {
  let rip = args.join(' ');
  var achievURL = 'https://www.minecraftskinstealer.com/achievement/a.php?i=1&h=Achievement+get%21&t='

  if (args.length < 1){ 
    rip = await awaitInput.run(message.channel, 8000, 1, m => m.author.id == message.author.id, 'What is the name of the achievment?')
    rip = await rip.first().content
    console.log(rip)
  }
  if(!rip) {
    throwError.throwEmbed('I need something to write on there.')
    return
  }

  message.channel.startTyping();
  Jimp.read(achievURL, function (err, image) {
    Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function (font) {
      image.print(font, 59, 32, rip);
      image.write(`../img/achiv${message.author.id}.png`, function() {
        message.channel.send({file: `../img/achiv${message.author.id}.png`})
        message.channel.stopTyping()
       }
      )
    })
    if (err) { 
      throw err
      throwError.throwErrorLowPriority(client, message.channel, '~Achieve || Jimp Error', err)
    };
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