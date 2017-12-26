const Jimp = require('jimp');

exports.run = (client, message, args) =>{
  message.channel.startTyping();
  Jimp.read('http://tombgen.appspot.com/images/tombstone.png', function(err, image) {
    let rip = args.join(' ');
    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function(font) {
      image.print(font, 143, 107, rip, 400);
      image.write(`../img/rip${message.author.id}.png`, function() {
        message.channel.send({file: `../img/rip${message.author.id}.png`})
        message.channel.stopTyping()
       });
  
    });
    if(err)
      throw err;
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
  name: 'rip',
  description: '🗿 Creates a tombstone with a defined text.',
  longDescription: "",
  usage: 'rip [text]'
};

