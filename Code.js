function doPost(e) {
  const token = "your_bot_token";
  const bot = new Bot.Telesun(token, e);

  bot.Command(/restart/, restartEmojis);

  bot.Command("start@emoji_quest_game_bot", gameStarter);

  bot.Message(Game);
}
