const instantBot = require('instant-bot');
const blackbirds = require('./blackbirds');

instantBot({host: 'glitch', rate: '10 minutes'}, (bot) => {
  const lastPost = bot.recentPosts[0];
  const nextPost = blackbirds.nextPost(lastPost);
  bot.postImage(nextPost.postContent, nextPost.imageData);
});
