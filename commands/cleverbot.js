const Cleverbot = require('cleverbot-node');
const clbot = new Cleverbot;

module.exports.run = (client, message, args, config) => {
  clbot.configure({ botapi: config.clevertoken });
  let Input = args.join();

  clbot.write(Input, (response) => {
    message.channel.startTyping();
    setTimeout(() => {
      message.channel.send(response.output).catch(console.error);
      message.channel.stopTyping();
    }, Math.random() * (1 - 3) + 1 * 1000);
  });
};

exports.settings = {
  enabled: true,     
  public: true,
  PM: true,
};

exports.help = {
  name: 'cl',
  description: '💬 Talk to me!',
  usage: 'cl [message]'
};