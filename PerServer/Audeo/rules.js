const config = require('./config.json');

const FTGID = config.serverID;
const newChannel = '347040091044315136';

module.exports = (client) => {
  client.on('guildMemberAdd', (member) => { 
    if(member.guild.id !== FTGID) return;
    let roleNew = member.guild.roles.get('347041297087070210');
    member.addRole(roleNew);
  });
  client.on('message', message => {
    if(message.channel.id !== newChannel) return;
    if(message.content.startsWith('#understand')){
      let roleNew = message.guild.roles.get('347041297087070210');
      let roleMem = message.guild.roles.get('347037919602540544');
      message.member.addRole(roleMem);
      message.member.removeRole(roleNew);
      return;
    }
  });
};