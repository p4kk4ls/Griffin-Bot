const Discord = require('discord.js');

exports.run = async(client, message, args) =>{
    message.delete();
      if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.reply('You dont have permissions mate!').then(botmsg =>{botmsg.delete(5000)});
      if(!message.guild.channels.find('name', 'mod-log')) return message.channel.send("Please create a channel called #pins!").then(botmsg =>{botmsg.delete(5000)});
      if(isNaN(args)) return message.channel.send("Please insert a message ID!!").then(botmsg =>{botmsg.delete(5000)});
      if(!args) return message.channel.send("Please insert a message ID!!").then(botmsg =>{botmsg.delete(5000)});
      // if(message.mentions >= 1){
    //     let userID =  message.mentions.first
    //     let messageID = message.channel.members.find("id", userID).lastMessageID;
    //     console.log (messageID + userID)
    // } else {
    let messageID = args.slice(" ")
    sendEmbed(message, messageID)
};

exports.help = {
  name: 'pin',
  description: '🔧 Pins a message',
  usage: 'pin [message id]'
};
function sendEmbed(message, messageID) {
    message.channel.fetchMessage(messageID).then(messageFetched => {
        // console.log(messageFetched);
        let embed = new Discord.RichEmbed()
        .setAuthor(messageFetched.author.tag, messageFetched.author.displayAvatarURL)
        .setDescription(messageFetched.content)
        .setTimestamp(messageFetched.createdAt)
        .setColor('#f9ce0c')
        .setFooter(`In: #${message.channel.name}`);
        message.guild.channels.find('name', 'pins').send({embed: embed})

    });
}

