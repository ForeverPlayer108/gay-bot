const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fetch = require("node-fetch");
const redditFetch = require('reddit-fetch');

client.once("ready", () => console.log("done, nigger"));

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.id == config.cid) {
        message.channel.startTyping();
        const response = await fetch(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(message.content)}`)
        const json = await response.json();
        message.channel.send(json.response);
        return message.channel.stopTyping(true);
    }
});

client.on('message', message => {
  if(message.content == '/hentai'){
      redditFetch({

    subreddit: 'hentai',
    sort: 'top',
    allowNSFW: true,
    allowModPost: true,
    allowCrossPost: true,

}).then(post => {
    message.channel.send(`${post.url}`);
  });
  }
});

client.login(config.token);
