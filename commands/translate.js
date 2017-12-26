const Discord = require('discord.js');
const translate = require('google-translate-api');
const he = require('he');

exports.run = (client, message) =>{
  let messageAray = message.content.split(' | ');

  let toTranslate = messageAray[0].slice(10);
  let langTo = messageAray[1];
  let langFrom = messageAray[2];

  if(!toTranslate){
    let errorEmbed = new Discord.RichEmbed()
      .setTitle('I have nothing to translate!')
      .setColor('#ff0000');
    message.channel.send({embed: errorEmbed}).then(botmsg =>{botmsg.delete(5000);});
    return;
  }
  if(!langTo){
    let errorEmbed = new Discord.RichEmbed()
      .setTitle('Missing language argument.')
      .setColor('#ff0000');
    message.channel.send({embed: errorEmbed}).then(botmsg =>{botmsg.delete(5000);});
    return;
  }

  translate(toTranslate, {from: langFrom, to: langTo}).then(translated => {
    var translatedText = he.decode(translated.text);
    var translatedTextDidYouMean = he.decode(translated.from.text.value);
    if(translated.from.text.didYouMean || translated.from.text.autoCorrected){
      let embed = new Discord.RichEmbed()
        .setAuthor(`Translate: ${toTranslate}`, 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Translate-icon.png')
        .addField('From:', translated.from.language.iso, true)
        .addField('To:', langTo, true)
        .addField('Did you mean?', translatedTextDidYouMean)
        .setColor('#0273d6')
        .addField('Output', translatedText);
      message.channel.send({embed});
      return;
    }else{
      let embed = new Discord.RichEmbed()
        .setAuthor(`Translate: ${toTranslate}`, 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Translate-icon.png')
        .addField('From:', translated.from.language.iso, true)
        .addField('To:', langTo, true)
        .addField('Output', translatedText)
        .setColor('#0273d6');
      message.channel.send({embed});
      return;
    }
  }).catch(err => {
    if(err.code == 400){
      let errorEmbed = new Discord.RichEmbed()
        .setTitle('This language is not supported!')
        .setDescription('Try to use another formating (en | english)')
        .setColor('#ff0000');
      message.channel.send({embed: errorEmbed});
      return;
    }
    console.error(err);
    let errorEmbed = new Discord.RichEmbed()
      .setTitle('google-translate-api')
      .setDescription(`ERROR: ${err}`)
      .setTimestamp(new Date());
    client.channels.get('333727164937666562').send({embed: errorEmbed});
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
  name: 'translate',
  description: 'TODO',
  longDescription: "",
  usage: '🈸translate [Text to translate] | [to] | [from]'
};