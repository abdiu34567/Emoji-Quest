function Deploy() {
  // find from bot father
  let botToken = "your_bot_token";

  //you will found the url after you deploy your code
  let webhookUrl = "your_web_app_url";
  Bot.setWebHook(botToken, { url: webhookUrl });
}

function DevMode() {
  let botToken = "your_bot_token";
  Bot.deleteWebhook(botToken);
}
