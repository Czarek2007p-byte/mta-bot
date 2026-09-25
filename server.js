const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();
app.use(express.json());

// UZUPEŁNIJ SWOIM TOKENEM I ID KANAŁU
const BOT_TOKEN = "TUTAJ_WLEJ_TOKEN_BOTA";
const CHANNEL_ID = "TUTAJ_WLEJ_ID_KANAŁU";

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
