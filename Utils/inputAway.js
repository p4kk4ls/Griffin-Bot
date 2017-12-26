const Discord = require('discord.js')

/**
 * Awaits chat input, returns collection
 * @param {*Discord Channel} channel
 * @param {*Time before timeout} time 
 * @param {*Maximum of messages} max 
 * @param {*Filters to apply} filter 
 * @param {*Title of the awaiting embed} title 
 */
exports.run = async(channel ,time, max, filter, title) => {
        let embed = new Discord.RichEmbed()
          .setTitle(title)
          .setDescription('Awaiting input....')
          .setColor('#d15b12');
        let embedAwait = await channel.send({embed});
        var textRecived = await channel.awaitMessages(filter, {time: time, max: max, errors: ['time']}).catch(error =>{
          let embedError = new Discord.RichEmbed()
          .setTitle('Invalid arguments.')
          .setColor('#d15b12');
          embedAwait.edit({embed: embedError})
        });
        if(!textRecived.first()) return
        return textRecived;
};

exports.settings = {
    enabled: false,     
    public: false,
};