const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "소환사의 협곡의 오신걸 환영합니다";
const byeChannelComment = "잘가라 칵퉤!";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '파잌봇 뭐해') {
    return message.reply('님이랑 놀고있음');
  }

  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 이파잌 어때') {
      return message.reply('조아');
    }
  })
  
  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 박나원 어떄') {
      return message.reply('『티모정글』');
    }
  })

  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 op.gg') {
      return message.reply('https://www.op.gg/');
    }
  })

  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 op.gg 롤토체스') {
      return message.reply('https://lolchess.gg/');
    }
  })

  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 민서 어때') {
      return message.reply('어음...민서교');
    }
  })
  
  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 유빈 어때') {
      return message.reply('ㅗㅜㅑ');
    }
  })

  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 우현 어때') {
      return message.reply('야스오 겁나 잘함');
    }
  })

  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 여비 어때') {
      return message.reply('요네 겁나 잘함');
    }
  })

  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '파잌봇 재영 어때') {
      return message.reply('겁나 아니다 쩝');
    }
  })

    if(message.content == '파잌봇 정보') {
    let img = 'https://cdn.discordapp.com/attachments/752544566564880427/763054114174402601/dd78e5d417b49268.png';
    let embed = new Discord.RichEmbed()
      .setTitle('파잌봇')
      .setURL('')
      .setAuthor('이파잌', img, '')
      .setThumbnail(img)
      .addBlankField()
      .addField('출생', '대충 이파잌이 만듬')
      .addField('그냥 대충 만든거임', '찡긋', true)
      .addField('진짜로 대충만듬', '찡긋찡긋', true)
      .addField('진짜인데 대충만들었는데', '찡긋빵긋', true)
      .addField('앙', '앙\n앙\n\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('이파잌만듬', img)

    message.channel.send(embed)
  }
  

  if(message.content.startsWith('파잌봇 공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('파잌봇 공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }

  if(message.content.startsWith('파잌봇 청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('파잌봇 청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);