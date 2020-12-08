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
        console.log(`${newState.member.displayName}\tjoined_channel\t${newState.channel.name}\t${Date.now()}`)
    } else if (oldState.channel !== null && newState.channel === null) {
        console.log(`${newState.member.displayName}\tleft_channel\t${oldState.channel.name}\t${Date.now()}`)
    }else if (oldState.streaming || newState.streaming) {
        if (!oldState.streaming && newState.streaming) {
            console.log(`${newState.member.displayName}\tstarted_streaming\t${newState.channel.name}\t${Date.now()}`)
        } else if (oldState.streaming && !newState.streaming) {
            console.log(`${newState.member.displayName}\tstopped_streaming\t${newState.channel.name}\t${Date.now()}`)
        }
    } else {
        console.log(`---------------------------------------`)
        console.log(`Unrecognized voiceStateUpdate difference:`)
        console.log(`${JSON.stringify(oldState)}\n${JSON.stringify(oldState.member)}\n${JSON.stringify(oldState.member.User)}\n${JSON.stringify(newState)}`)
        console.log(`---------------------------------------`)
    }
})

client.login(process.env.TOKEN);