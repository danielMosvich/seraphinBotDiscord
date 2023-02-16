// const { Client } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.MessageContent,
  ],
});
require("dotenv/config");
const configuration = new Configuration({
  apiKey: process.env.CHAT_GPT_KEY,
});

const openai = new OpenAIApi(configuration);

client.on("ready", () => {
  console.log(`Loggen is Complete :D ${client.user.tag}`);
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("-seraphin")) return;
  message.content = message.content.replace("-seraphin ", "");

  let prompt = `follow the conversation as if it were a seraphin, speaking wisely, all in Spanish`;
  prompt += `${message.author.username} : ${message.content}`;
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 500,
    // temperature: 0.9,
    prompt,
    stop: ["seraphin:", `${message.author.username}:`],
  });

  message.channel.send({ content: `${res.data.choices[0].text}` });
});
client.login(process.env.DISCORD_KEY);
