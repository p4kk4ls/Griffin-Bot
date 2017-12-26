const Jimp = require('jimp')
const discordError = require('../Utils/throwError');
const awaitMesages = require('../Utils/inputAway');

exports.run = async(client, message, args) => {
  var kaplanImage = 'https://hucjrw-am3pap001.files.1drv.com/y4m5BBGocmgZi0R4J0Jw2Oy-ZVK-9kwxIw0DI0tM_nHCO2WvU5jYSS9j6WtfHPEwEWvUXyr1eYBEzM_nCcUlepUwSh8lfte5mPdoSTUnz-b5s1BwWLZpMPg-FFnCHTVMFjyzm55haZlmwlXXkUdXVAUCAgopFSPNkT_Oi0YcfCrwcDInlBN3VmJWGiz3cKzKFe0iPxkEF3oJvceSBSUIivYAA/Jeff.png?psid=1'
  let userImage;
  var messageAttachArray = (message.attachments).array()

  if(messageAttachArray[0]){
    userImage = messageAttachArray[0].url
  } else if (args[0]) {
    userImage = args[0]
  } else if (!args[0]) {
    let awaitedMessage = await awaitMesages.run(message.channel, 8000, 1, m => m.author.id == message.author.id, "What image?")
    awaitedMessageAttachArray = (awaitedMessage.first().attachments).array()
    if (awaitedMessageAttachArray[0]) { 
      userImage = await awaitedMessageAttachArray[0].url
    } else { 
         userImage = await awaitedMessage.first().content
    }
  }

  new Jimp(1181, 731, 0x000000ff, function (err, image) {
    Jimp.read(userImage, function(err, imageUserJimp){
      if(!imageUserJimp){
        discordError.throwEmbed(message.channel, 'Invalid image')
        return
      }
      message.channel.startTyping()
      imageUserJimp.contain(246, 198)
      image.composite(imageUserJimp, 485, 131)
      Jimp.read(kaplanImage, function(err, imageKaplanJimp){
        image.composite(imageKaplanJimp, 0, 0)
        image.write(`../img/jeff${message.author.id}.png`, function() {
          message.channel.send({file: `../img/jeff${message.author.id}.png`})
          message.channel.stopTyping()
        })
      })
    })
    if (err) throw err;
  })
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'kaplan',
  description: '',
  longDescription: "",
  usage: ''
};
