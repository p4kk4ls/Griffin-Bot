const Jimp = require('jimp')
exports.run = async(client, message, args) => {
  message.channel.startTyping();
  Jimp.read('https://www.minecraftskinstealer.com/achievement/a.php?i=1&h=Achievement+get%21&t=', function (err, image) {
    let rip = args.join(' ');
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