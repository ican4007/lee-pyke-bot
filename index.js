const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzYzMDA0MjA4ODg1OTIzODUx.X3xZCw.9fGAxtZmDnZp4_7pEhYcQ_X-0F4';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);