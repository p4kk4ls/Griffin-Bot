exports.run = (client, message, args,config) => {
    message.channel.send('Ping?!')
      .then(msg => {
        msg.edit(`<:gun:333359555117580291> BANG! Ur dead! (Took me: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
      });
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
  owneronly: false,
  permissionsRequired: [],
};

exports.help = {
  name: 'ping',
  description: '🏓 I wonder what it does.',
  longDescription: "",
  usage: 'ping'
};
