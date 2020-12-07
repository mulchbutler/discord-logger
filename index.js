const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.channel === null && newState.channel !== null) {
        console.log(`Member [${newState.member.displayName}] joined channel <${newState.channel.name}> at timestamp {${Date.now()}}`)
    } else if (oldState.channel !== null && newState.channel === null) {
        console.log(`Member [${newState.member.displayName}] left channel <${oldState.channel.name}> at timestamp {${Date.now()}}`)
    }else if (oldState.streaming || newState.streaming) {
        if (!oldState.streaming && newState.streaming) {
            console.log(`Member [${newState.member.displayName}] started streaming in channel <${newState.channel.name}> at timestamp {${Date.now()}}`)
        } else {
            console.log(`Member [${newState.member.displayName}] stopped streaming in channel <${newState.channel.name}> at timestamp {${Date.now()}}`)
        }
    } else {
        console.log(`Unrecognized state difference:`)
        console.log(`oldState: ${JSON.stringify(oldState)}`)
        console.log(`newState: ${JSON.stringify(newState)}`)
    }
})

client.login(process.env.TOKEN);