exports.run = (client, message, args) =>{
  message.channel.send('**H E L L O  I  A M  G R I F F I N**');
  return;
};

exports.settings = {
  enabled: false,     
  public: false,
};

exports.help = {
  name: 'hello',
  description: '👋 Hallo',
  usage: 'hello'
};
