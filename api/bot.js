const TelegramBot = require('node-telegram-bot-api')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const token = "7389128574:AAFF4gK2piI-pyTZRKpR4SWkQLXgRrKTGiU"

const bot = new TelegramBot(token, { polling: true })

let botStatus = { status: 'offline' }

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Selamat datang di bot saya!')
})

bot.on('message', (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Anda mengirim: ' + msg.text)
})

bot.on('polling_error', (error) => {
    console.error(error)
});

botStatus.status = 'online'

app.get('/api/status', (req, res) => {
    res.json(botStatus)
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`)
})
