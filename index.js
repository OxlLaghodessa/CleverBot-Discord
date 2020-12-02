const Discord = require('discord.js');

const client = new Discord.Client();

const cleverbot = require("cleverbot-free"); // npm i cleverbot-free

var conversation = {};


// Presence
function presence() {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Your google assistant is ready!',
            type:'PLAYING'
        }    
    });
}



client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
    presence();
});



// Code CleverBot
client.on("message", async(message)=>{
if(!message.author.bot && message.channel.id == ""){ // channel Id
  message.channel.startTyping();
  if (!conversation[message.guild.id])conversation[message.guild.id] = [];
  if (!conversation[0]) {
    cleverbot(message.content.trim()).then(response => {
      conversation[message.guild.id].push(message.content.trim());
      conversation[message.guild.id].push(response);
      return message.channel.send(response).then(() => message.channel.stopTyping(true));
    });
  } else {
    cleverbot(message.content.trim(), conversation[message.guild.id]).then(response => {
      conversation[message.guild.id].push(message.content.trim());
      conversation[message.guild.id].push(response);
      return message.channel.send(response).then(() => message.channel.stopTyping(true));
    });
  }
}});



client.login(""); // Your Token Bot 
