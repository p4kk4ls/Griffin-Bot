const Jimp = require('jimp')
exports.run = async(client, message, args) => {
  message.channel.startTyping();
  Jimp.read('https://www.minecraftskinstealer.com/achievement/a.php?i=1&h=Achievement+get%21&t=', async function (err, image) {
    let rip = args.join(' ');
    Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(async function (font) {
      image.print(font, 59, 32, rip);
      image.write(`../img/achiv${message.author.id}.png`);
      await message.channel.send({file: `../img/achiv${message.author.id}.png`})
    })
    await message.channel.stopTyping()

    if (err) throw err;
  });

};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
};

exports.help = {
  name: 'achiv',
  description: '🏆 Achievement get!',
  usage: 'achiv [text]'
};