const Discord = require('discord.js')

exports.run = async(message ,time, max, filter, title) => {
        let embed = new Discord.RichEmbed()
          .setTitle(title)
          .setDescription('Awaiting input....')
          .setColor('#d15b12');
        let embedAwait = await message.channel.send({embed});
        var textRecived = await message.channel.awaitMessages(filter, {time: time, max: max, errors: ['time']}).catch(error =>{
          let embedError = new Discord.RichEmbed()
          .setTitle('Invalid arguments.')
          .setColor('#d15b12');
          embedAwait.edit({embed: embedError})
        });
        if(textRecived.first)
        return textRecived;
};

exports.settings = {
    enabled: false,     
    public: false,
};