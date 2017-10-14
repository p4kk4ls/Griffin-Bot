const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

module.exports = (client, config) =>{
  const prefix = config.prefix;
  let queues = {};

  client.on('message', msg => {
    const message = msg.content.trim();


    if (message.toLowerCase().startsWith(prefix.toLowerCase())) {
      const command = message.substring(prefix.length).split(/[ \n]/)[0].toLowerCase().trim();
      const args = message.substring(prefix.length + command.length).trim();

      switch (command) {
        case 'play':
          return play(msg, args);
        case 'skip':
          return skip(msg, args);
        case 'queue':
          return queue(msg, args);
        case 'leave':
          return leave(msg, args);
      }
    }
  });

  function isAdmin(member)
  {
    return member.hasPermission('MANAGE_MESSAGES');
  }

  function getQueue(server)
  {
    if (!queues[server]) queues[server] = [];
    return queues[server];
  }

  function play(msg, args) {
    console.log(queues);
    if (msg.member.voiceChannel === undefined) return msg.channel.send('You\'re not in a voice channel.');

    if (!args) return msg.channel.send('I need the name of the song!!');

    const queue = getQueue(msg.guild.id);

    let Searching = new Discord.RichEmbed()
      .setAuthor(`Searching for '${args}'!!`, 'http://pic.2265.com/upload/2017-5/2017519152314485.png')
      .setFooter(`Requested by: ${msg.author.tag}`)
      .setColor('#f26b04');

    msg.channel.send({embed: Searching}).then(botmsg => {
      var videoname = args;

      if (!args.toLowerCase().startsWith('http') || !args.toLowerCase().startsWith('www.')) {
        videoname = 'gvsearch1:' + args;
      }
      // '-q', '--no-warnings', 
      YoutubeDL.getInfo(videoname, ['--verbose'],{maxBuffer: Infinity}, (err, info) => {
        let Searching = new Discord.RichEmbed()
          .setAuthor(`I can't find ${args}!!`,'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-128.png')
          .setFooter(`Requested by: ${msg.author.tag}`)
          .setColor('#c40101');
        if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
          botmsg.delete();
          msg.channel.send({embed: Searching}).then(botmsg =>{botmsg.delete(5000);});
          if(err.length >= 240) return client.channels.get('333727164937666562').send('Log too long for discord check the TERMINAL!');
          // let errorEmbed = new Discord.RichEmbed()
          //   .setTitle('Music Bot')
          //   .setDescription(`ERROR: ${err}`)
          //   .setTimestamp(new Date());
          //client.channels.get('333727164937666562').send({embed: errorEmbed});
          console.log(err);
          return;
        }
        console.log(videoname);
        info.requester = msg.author.id;

        let SearchingRes = new Discord.RichEmbed()
          .setAuthor(`${info.fulltitle}`, 'http://pic.2265.com/upload/2017-5/2017519152314485.png')
          .addField('Uploaded by:', `${info.uploader}`,true)
          .addField('Duration:', `${info.duration}`,true)
          .setFooter(`Requested by: ${msg.author.tag}`)
          .setThumbnail(info.thumbnail)
          .setColor('#f26b04');
        botmsg.delete();

        msg.channel.send({embed: SearchingRes}).then(() => {
          queue.push(info);
          if (queue.length === 1) executeQueue(msg, queue);
        }).catch(console.log);
      });
    }).catch(console.log);
  }


  function skip(msg) {

    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
    if (voiceConnection === null) {
      msg.channel.send('Im not playing anything!!').then((botmsg) =>{
        botmsg.delete(5000);
      });
      return;
    }


    const queue = getQueue(msg.guild.id);
    //
    // if (!canSkip(msg.member, queue)) return msg.channel.send(wrap('You cannot skip this as you didn\'t queue it.')).then((response) => {
    // 	response.delete(5000);
    // });

    let toSkip = 1;

    queue.splice(0, toSkip - 1);

    const dispatcher = voiceConnection.player.dispatcher;
    if(!dispatcher.end) return;
    dispatcher.end();
    let skip = new Discord.RichEmbed()
      .setAuthor('Skipped!!', 'https://www.iconexperience.com/_img/g_collection_png/standard/512x512/ok.png')
      .setColor('#f26b04')
      .setFooter(`Skipped by ${msg.author.tag}`);
    msg.channel.send({embed: skip});
  }

  function queue(msg) {
    const queue = getQueue(msg.guild.id);
    const text = queue.map((video, index) => (
      (index + 1) + ': ' + `${video.title} (${video.duration})` 
    )).join('\n');

    let queueStatus = 'Stopped';
    if (text.length <= 240) return msg.channel.send('Queue too long for Discord to display!!!');
    let Queue = new Discord.RichEmbed()
      .setAuthor(`Queue ('${queueStatus}')`, 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/list-circle-blue-128.png')
      .setColor('#0a9cd1')
      .setDescription(`${text}`);

    msg.channel.send({embed: Queue});
  }


  function leave(msg) {
    if (isAdmin(msg.member)) {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
      if (voiceConnection === null) {
        msg.channel.send('Im not playing anything!!').then((botmsg) =>{
          botmsg.delete(5000);
        });
        return;
      }

      const queue = getQueue(msg.guild.id);
      queue.splice(0, queue.length);
      voiceConnection.player.dispatcher.end();
      voiceConnection.disconnect();
    } else {
      msg.channel.send('You don\'t have permission to use that command mate!');
    }
  }

  function executeQueue(msg, queue) {
    if (queue.length === 0) {
      msg.channel.send('Playback finished.');

      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
      if (voiceConnection !== null) return voiceConnection.disconnect();
    }

    new Promise((resolve, reject) => {
      const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
      if (voiceConnection === null) {
        if (msg.member.voiceChannel) {
          msg.member.voiceChannel.join().then(connection => {
            resolve(connection);
          }).catch((error) => {
            console.log(error);
            if(error.length >= 240) return client.channels.get('333727164937666562').send('Log too long for discord check the TERMINAL!');
            // let errorEmbed = new Discord.RichEmbed()
            //   .setTitle('Music bot')
            //   .setDescription(`ERROR: ${error}`)
            //   .setTimestamp(new Date());
            //client.channels.get('333727164937666562').send({embed: errorEmbed});
          });
        } else {
          queue.splice(0, queue.length);
          reject();
        }
      } else {
        resolve(voiceConnection);
      }
    }).then(connection => {
      const video = queue[0];


      let SearchingRes = new Discord.RichEmbed()
        .setAuthor(`Now playing: ${video.fulltitle}`, 'http://pic.2265.com/upload/2017-5/2017519152314485.png')
        .addField('Uploaded by:', `${video.uploader}`,true)
        .addField('Duration:', `${video.duration}`,true)
        .setThumbnail(video.thumbnail)
        .setColor('#f26b04');
      msg.channel.send({embed: SearchingRes}).then(() => {
        let dispatcher = connection.playStream(ytdl(video.webpage_url, {filter: 'audioonly'}), {seek: 0, volume: (50/100)});

        connection.on('error', (error) => {
          // Skip to the next song.
          console.log(error);
          if(error.length >= 240) return client.channels.get('333727164937666562').send('Log too long for discord check the TERMINAL!');
          // let errorEmbed = new Discord.RichEmbed()
          //   .setTitle('Music bot')
          //   .setDescription(`ERROR: ${error}`)
          //   .setTimestamp(new Date());
          //client.channels.get('333727164937666562').send({embed: errorEmbed});
          queue.shift();
          executeQueue(msg, queue);
        });

        dispatcher.on('error', (error) => {
          // Skip to the next song.
          console.log(error);
          if(error.length >= 240) return client.channels.get('333727164937666562').send('Log too long for discord check the TERMINAL!');
          // let errorEmbed = new Discord.RichEmbed()
          //   .setTitle('Music bot')
          //   .setDescription(`ERROR: ${error}`)
          //   .setTimestamp(new Date());
          //client.channels.get('333727164937666562').send({embed: errorEmbed});
          queue.shift();
          executeQueue(msg, queue);
        });

        dispatcher.on('end', () => {
          // Wait a second.
          setTimeout(() => {
            if (queue.length > 0) {
              // Remove the song from the queue.
              queue.shift();
              // Play the next song in the queue.
              executeQueue(msg, queue);
            }
          }, 1000);
        });
      }).catch((error) => {
        console.log(error);
        if(error.length >= 240) return client.channels.get('333727164937666562').send('Log too long for discord check the TERMINAL!');
        // let errorEmbed = new Discord.RichEmbed()
        //   .setTitle('Music bot')
        //   .setDescription(`ERROR: ${error}`)
        //   .setTimestamp(new Date());
        //client.channels.get('333727164937666562').send({embed: errorEmbed});
      });
    }).catch((error) => {
      console.log(error);
      if(error.length >= 240) return client.channels.get('333727164937666562').send('Log too long for discord check the TERMINAL!');
      // let errorEmbed = new Discord.RichEmbed()
      //   .setTitle('Music bot')
      //   .setDescription(`ERROR: ${error}`)
      //   .setTimestamp(new Date());
      //client.channels.get('333727164937666562').send({embed: errorEmbed});
    });
  }
};
