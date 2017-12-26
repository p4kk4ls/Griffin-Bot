const Discord = require('discord.js')


/**
 * Sends an error embed with a description
 * @param {*Discord Channel} channel 
 * @param {*Error Title} errTitle 
 * @param {*Error Description} errDesc 
 */
exports.throwEmbedDescription = (channel, errTitle, errDesc) => {
    channel.send({
        embed: new Discord.RichEmbed()
        .setTitle(errTitle)
        .errDesc(errDesc)
    })
};

/**
 * Sends an error emebed
 * @param {*Discord Channel} channel 
 * @param {*Error Title} errTitle 
 */
exports.throwEmbed = (channel, errTitle) => {
    channel.send({
        embed: new Discord.RichEmbed()
        .setTitle(errTitle)
    })
};

exports.settings = {
    enabled: false,     
    public: false,
};