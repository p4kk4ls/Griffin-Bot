const config = require('./config.json');

const FTGID = config.serverID;
const roleChannel = '343759337413541899';

module.exports = (client) => {
  client.on('guildMemberUpdate', (oldMember, newMember) => {      
    if(newMember.guild.id !== FTGID){return;}
    let rolename = JSON.stringify(newMember.roles().name);
    client.channels.get(roleChannel).send(`${newMember.user.username} is now '${rolename}'`);
    console.log(rolename);
    console.log(newMember.roles);
  });
};

// GuildMember {
//   guild:
//    Guild {
//      members:
//       Collection {
//         '235047463017381888' => [Object],
//         '315158394367377408' => [Object] },
//      channels:
//       Collection {
//         '343747901618520064' => [Object],
//         '343747901618520065' => [Object] },
//      roles:
//       Collection {
//         '343747901618520064' => [Object],
//         '343754357738569729' => [Object],
//         '343756639113052162' => [Object] },
//      presences:
//       Collection {
//         '235047463017381888' => [Object],
//         '315158394367377408' => [Object] },
//      available: true,
//      id: '343747901618520064',
//      name: 'Fake FTG server',
//      icon: null,
//      splash: null,
//      region: 'eu-central',
//      memberCount: 2,
//      large: false,
//      features: [],
//      applicationID: null,
//      afkTimeout: 300,
//      afkChannelID: null,
//      embedEnabled: undefined,
//      verificationLevel: 0,
//      explicitContentFilter: 0,
//      joinedTimestamp: 1502027825545,
//      ownerID: '235047463017381888',
//      _rawVoiceStates: Collection {},
//      emojis: Collection {} },
//   user:
//    User {
//      id: '235047463017381888',
//      username: 'Pesky12',
//      discriminator: '8762',
//      avatar: 'b6f0176c43c87e9a2b59059642f26604',
//      bot: false,
//      lastMessageID: null,
//      lastMessage: null },
//   _roles: [ '343756639113052162' ],
//   serverDeaf: false,
//   serverMute: false,
//   selfMute: undefined,
//   selfDeaf: undefined,
//   voiceSessionID: undefined,
//   voiceChannelID: undefined,
//   speaking: false,
//   nickname: null,
//   joinedTimestamp: 1502026286275,
//   lastMessageID: null,
//   lastMessage: null }