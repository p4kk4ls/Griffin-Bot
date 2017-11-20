exports.run = (client, message, args,config) => {
  if(message.author.id === config.ownerID && args){
    let messageInput = args.slice(1);
    let messageInputJs = messageInput.join(' ')
    client.channels.get(args[0]).send(messageInputJs);
  }
  if(message.author.id === '382226489011339266' && args){
      let messageInput = args.slice(1);
      let messageInputJs = messageInput.join(' ')
      client.channels.get(args[0]).send(messageInputJs);
  }else{
    message.channel.send('Ping?!')
      .then(msg => {
        msg.edit(`<:gun:333359555117580291> BANG! Ur dead! (Took me: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
      });
  }
};

exports.help = {
  name: 'ping',
  description: '🏓 I wonder what it does.',
  usage: 'ping'
};
