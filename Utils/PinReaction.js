const Discord = require('discord.js');

module.exports = (client, config) =>{
    reactionAdded(client);
};

function reactionAdded (client) {
    client.on("messageReactionAdd", (reaction, user) =>{
        var message = reaction.message;
        if(reaction.emoji.name === '📌'){
            if(!message.guild.member(user).hasPermission('MANAGE_MESSAGES')) return;
            if(!message.guild.channels.find('name', 'pins')) return;
            // console.log(message)
            sendEmbed(message, message.id)
        };
        // console.log(user)
    });
};

function sendEmbed(message, messageID) {
    message.channel.fetchMessage(messageID).then(messageFetched => {
        
        console.log(messageFetched.channel.id)
        if(messageFetched.channel.id == '286870812030402560'){
        var channelSwitchName = 'pins-artwork';
        } else {var channelSwitchName = 'pins'}
        var Attachment = (messageFetched.attachments).array()
        var attachmentsURL;
        var attachFile;
        let embed;
        if (Attachment[0]){
            attachFile = Attachment[0].url
            embed = new Discord.RichEmbed()
            .setAuthor(messageFetched.author.tag, messageFetched.author.displayAvatarURL)
            .setDescription(`${messageFetched.content} \n ${attachFile}`)
            .setImage(attachFile)
            .setTimestamp(messageFetched.createdAt)
            .setColor('#f9ce0c')
            .setFooter(`In: #${message.channel.name}`);
        } else {
            embed = new Discord.RichEmbed()
                .setAuthor(messageFetched.author.tag, messageFetched.author.displayAvatarURL)
                .setDescription(messageFetched.content)
                .setTimestamp(messageFetched.createdAt)
                .setColor('#f9ce0c')
                .setFooter(`In: #${message.channel.name}`)};
        message.channel.send(":ok_hand: Pinned").then(botmsg => {botmsg.delete(5000)})
        message.guild.channels.find('name', channelSwitchName).send({embed: embed})
    });
};