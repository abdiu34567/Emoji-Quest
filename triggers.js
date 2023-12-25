// Callback function for trigger
function manageGame(ctx) {
  const gameState = getGameState();
  if (gameState === "loss") {
    const message_id = getGameId();

    try {
      ctx.editMessageText({
        chat_id: ctx.message.chat.id,
        message_id: message_id,
        text: "Time's up! The game has expired.",
        parse_mode: "HTML",
      });
    } catch (err) {
      console.log(err);
    }
  }
  // Deletes all triggers in the current project.
  deleteTriggers();
}

function deleteTriggers() {
  // Deletes all triggers in the current project.
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

function Trigger() {
  const api = {
    update_id: 991350984,
    message: {
      message_id: 11325,
      from: {
        id: 1173180004,
        is_bot: false,
        first_name: "Me",
        last_name: "ab",
        username: "Me_abd",
        language_code: "en",
      },
      chat: {
        id: -1001531569026,
        title: "Talk Telesun Telegram Bots",
        username: "telesunjs",
        type: "supergroup",
        // id: -1001506930739, title: 'Trial', type: 'supergroup' //trial group
      },
      text: "start",
    },
  };

  const e = {
    postData: {
      contents: JSON.stringify(api),
    },
  };

  const token = "your_bot_token";

  const bot = new Bot.Telesun(token, e);

  bot.Use(manageGame);
}
