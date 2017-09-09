const Discord = require('discord.js');
const translate = require('google-translate-api');

exports.run = (client, message) =>{
  let messageAray = message.content.split(' | ');

  let toTranslate = messageAray[0].slice(10);
  let langTo = messageAray[1];
  let langFrom = messageAray[2];

  translate(toTranslate, {from: langFrom, to: langTo}).then(translated => {
    console.log(translated.text);
    // //=> Ik spreek Nederlands! 
    // console.log(translated.from.text.autoCorrected);
    // //=> true 
    // console.log(translated.from.text.value);
    // //=> I [speak] Dutch! 
    // console.log(translated.from.text.didYouMean);
    // //=> false 
    console.log(translated);
    if(translated.from.text.didYouMean || translated.from.text.autoCorrected){
      var embed = new Discord.RichEmbed()
        .setAuthor(`Translate: ${toTranslate}`, 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Translate-icon.png')
        .addField('From:', translated.from.language.iso, true)
        .addField('To:', langTo, true)
        .addField('Did you mean?', translated.from.text.value)
        .addField('Output', translated.text, true);
    }

    if(translated.from.text.autoCorrected){
      var embed = new Discord.RichEmbed()
        .setAuthor(`Translate: ${toTranslate}`, 'http://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Translate-icon.png')
        .addField('From:', translated.from.language.iso, true)
        .addField('To:', langTo, true)
        .addField('Output', translated.text, true);
    }
    message.channel.send({embed})
  }).catch(err => {
    console.error(err);
  });
};

exports.help = {
  name: 'translate',
  description: 'TODO',
  usage: 'translate [Text to translate] | [to] | [from]'
};

// ┌─────────────────────
// |Pesky12#8762 used '~translate Jek,se,mas,|,en,|,cs' in 'Gryphon L.O.G'/'beta-bot-only'
// └─────────────────────
// Jek se mas
// { text: 'Jek se mas',
//   from:
//    { language: { didYouMean: true, iso: 'ms' },
//      text: { autoCorrected: false, value: '[Jak] se mas', didYouMean: true } },
//   raw: '' }
