const config = require('./config.json');

const FTGID = config.serverID;
const roleChannel = '343673749469659137';
const newChannel = '343778603584061441';

module.exports = (client) => {
  client.on('guildMemberAdd', (member) => { 
    if(member.guild.id !== FTGID)return;
    let roleNew = member.guild.roles.get('343778339711877120');
    member.addRole(roleNew);
  });
  client.on('message', message => {
    if(message.type = 'dm') return;
    if(message.channel.id !== newChannel) return;
    if(message.content.startsWith('#understand')){
      let roleNew = message.guild.roles.get('343778339711877120');
      let roleMem = message.guild.roles.get('343548892450783233');
      message.member.addRole(roleMem);
      message.member.removeRole(roleNew);
      client.channels.get(roleChannel).send(`<@${message.author.id}> is now a member!`);
      return;
    }
  });
};