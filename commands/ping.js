exports.run = (client, message) => {
// if(message.author.)

  message.channel.send('Ping?!')
    .then(msg => {
      msg.edit(`<:gun:333359555117580291> BANG! Ur dead! (Took me: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
    });
};

exports.help = {
  name: 'ping',
  description: '🏓 I wonder what it does.',
  usage: 'ping'
};
