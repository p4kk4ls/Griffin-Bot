const apiai = require('apiai');
const app = apiai('3477c5f2f6e1489d8c5caae7ca7a8272');

const guildID = '331072774112018433';

module.exports = (client) => {
  console.log('AI READY TO ROLL');
  client.on('message', (message) =>{
    if (message.type = 'dm') return;
    if (message.author.bot) return;
    if (message.mentions.users.first() !== client.user) return;
    if (message.guild.id !== guildID) return;
    let messageAray = message.content.split(' ');
    let args = messageAray.slice(1);

    var request = app.textRequest(args.join(' '), {
      sessionId: message.guild.id
    });
    
    request.on('response', function(response) {
      // console.log(args.join(' '));
      //    console.log(response);
      // console.log(JSON.stringify(response.result.fulfillment.speech, null, '  '));
      message.channel.send(JSON.stringify(response.result.fulfillment.speech, null, '  '));
      console.log('Responded')
    });
    
    request.on('error', function(error) {
      console.log(error);
      client.channels.get('333727164937666562').send(`${new Date()} AI.API: ${err}`);
    });
    
    request.end();
  });
};