const instantBot = require('instant-bot');

instantBot({host: 'glitch', rate: '5 minutes'}, (bot) => {
  bot.post('Hello world!')
});