const Discord = require('discord.js')
const logHighPriority = '331072865707360258'
const logLowPriority = '333727164937666562'


/**
 * Sends an error embed with a description
 * @param {*Discord Channel} channel 
 * @param {*Error Title} errTitle 
 * @param {*Error Description} errDesc
 * @param {*Colour} colour 
 */
exports.throwEmbedDescription = (channel, errTitle, errDesc, colour) => {
    channel.send({
        embed: new Discord.RichEmbed()
        .setTitle(errTitle)
        .setDescription(errDesc)
        .setColor(colour)
    })
};

/**
 * Sends an error emebed
 * @param {*Discord Channel} channel 
 * @param {*Error Title} errTitle 
 * @param {*Colour} colour
 */
exports.throwEmbed = (channel, errTitle, colour) => {
    channel.send({
        embed: new Discord.RichEmbed()
        .setTitle(errTitle)
        .setColor(colour)
    })
};

/**
 * Sends a error to "High Priority Log"
 * @param {*Discord Client} client 
 * @param {*Discord Channel} channel 
 * @param {*Error Title} errTitle 
 * @param {*Error Desc} errDesc 
 * @param {*Colour} colour 
 */
exports.throwErrorHighPriority = (client, channel, errTitle, errDesc, colour) => {
    client.channels.get(logHighPriority).send({ 
        embed: new Discord.RichEmbed()
        .setTitle(errTitle)
        .setDescription(errDesc)
        .setColor(colour)
        .setFooter(channel.name + '|' + channel.guild.name)
    })
}

exports.throwErrorLowPriority = (client, channel, errTitle, errDesc, colour) => {
    client.channels.get(logLowPriority).send({ 
        embed: new Discord.RichEmbed()
        .setTitle(errTitle)
        .setDescription(errDesc)
        .setColor(colour)
        .setFooter(channel.name + '|' + channel.guild.name)
    })
}

exports.settings = {
    enabled: false,     
    public: false,
};