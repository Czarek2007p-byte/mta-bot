const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();
app.use(express.json());

// Token i ID kanału będą bezpiecznie pobierane z panelu Render.com
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

let messageQueue = [];

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Bot aktywny jako: ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot || message.channel.id !== CHANNEL_ID) return;

    messageQueue.push({
        author: message.author.username,
        content: message.content
    });
});

app.get('/get-messages', (req, res) => {
    res.json(messageQueue);
    messageQueue = [];
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Serwer API uruchomiony!');
});

client.login(BOT_TOKEN);
