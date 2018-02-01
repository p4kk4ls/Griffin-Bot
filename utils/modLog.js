const Discord = require('discord.js')

/**
 * 
 * @param {String} actionName 
 * @param {Collection} executer 
 * @param {Collection} target 
 * @param {String} reason
 */
exports.modActionEmbed = (actionName, executer, target, reason) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(executer.tag, executer.displayAvatarURL)
    .addField('Action', actionName, true)
    .addField('Target', target.tag, true)
    .addField('Reason', reason + ' ', true)
    .setTimestamp(new Date())
  return embed
}