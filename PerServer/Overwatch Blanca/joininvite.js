const config = require('./config.json');

const FTGID = config.serverID;

module.exports = (client) => {
  client.on('guildMemberAdd', (member) => { 
    if(member.guild.id !== FTGID)return;
    let roleNew = member.guild.roles.get('343634824650686475');
    member.addRole(roleNew);
  });
};
