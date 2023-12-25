
function Game(ctx) {


    const { reply_to_message, text } = ctx.message;


    if (reply_to_message && reply_to_message.from.first_name === "Emoji Quest") {
        ctx.replyWithChatAction("typing");

        //message Id will set to zero
        //if there is a win
        let reply_message_id = reply_to_message.message_id;

        const reply_text = reply_to_message.text;

        const getGameEmoji = getGame(reply_text);

        //if the Game is already won, 
        //but someone is trying to reply
        if (reply_text.includes("🏆")) {
            saveGameState("win")
            return ctx.reply("The game has already ended.");
        }

        //winner
        if (text === getGameEmoji) {
            const winner = getWinner(ctx);

            // Calculate the elapsed time in milliseconds
            const elapsedTimeMillis = new Date().getTime() - getTime();

            // Convert milliseconds to seconds
            const elapsedTimeSeconds = Math.floor(elapsedTimeMillis / 1000);

            const winner_template = winnerTemplate(winner, text, elapsedTimeSeconds - 7)//triger lates 

            try {
                ctx.editMessageText({
                    chat_id: ctx.message.chat.id,
                    message_id: reply_message_id,
                    text: winner_template,
                    parse_mode: "HTML",
                    protect_content: true
                });
            } catch (err) { return }

            //Ending The Game
            deleteTriggers()

            //protecting the Game from expiring
            //once winned
            reply_message_id = 0
        }

        //delete any message replied to the Game
        deleteReply(ctx)

        
        saveGameId(reply_message_id)
    }

}


function deleteReply(ctx) {
    ctx.deleteMessage({
        chat_id: ctx.message.chat.id,
        message_id: ctx.message.message_id,
    });
}



function gameStarter(ctx) {
    ctx.replyWithChatAction("typing");


    tryDeletingOldGame(ctx);

    // const getEmojiGame = "🌟🍎🚗🌈🎉📚🌺" || getEmojis();//testing
    const getEmojiGame = selectRandomEmojis();//production
    const template = gameTemplate(getEmojiGame)
    ctx.replyWithHtml(template, { protect_content: true })


    //fix a bug of expires after wins, 
    //when new game started. 
    deleteTriggers()

    // Check if the trigger has been set before
    const existingTriggers = ScriptApp.getProjectTriggers();
    if (existingTriggers.length === 0) {
        // Set a trigger to expire after 1 minute
        ScriptApp.newTrigger('Trigger')
            .timeBased()
            .after(40000) // 0.5 minute in milliseconds
            .create();

    }

    //set timer
    setTime();

    //loss by default
    saveGameState("loss")

    //save message id, inorder to edit the message on win/expirey
    saveGameId(ctx.message.message_id + 1)
}

function tryDeletingOldGame(ctx) {
    const message_id = getGameId();

    //this means that the last Game is already won
    if (!message_id) { return }

    try {
        ctx.editMessageText({
            chat_id: ctx.message.chat.id,
            message_id: message_id,
            text: "Time's up! The game has expired.",
            parse_mode: "HTML",
        });
    } catch (err) {
        // console.log(err)
    }
}


function getWinner(ctx) {
    const username = ctx.message.from.username;
    const name = ctx.message.from.first_name;
    return (username) ? "@" + username : name;
}




function getGame(gameString) {
    const gameContent = gameString.split("🎮 Game:")[1]
    const game = gameContent.split("\n\n")[0].trim();
    return game;
}


function restartEmojis(ctx) {
    const admin = '1173180004';

    if (admin == ctx.message.from.id) {
        PropertiesService.getScriptProperties().setProperty("next", 2)
        return ctx.replyWithHtml("<b>#EMOJI_RESTARTER</b>\n\n" +
            "👤 Emojis used in last Games will be used in the next Games.")

    } else {
        return ctx.replyWithHtml("<b>#ONLY_ADMIN</b>\n\n" +
            "👤 Admin Required to initiate this command")
    }
}


function setTime() {
    // Capture the start time
    const startTime = new Date().getTime();
    PropertiesService.getScriptProperties().setProperty("time", startTime)
}

function getTime() {
    const time = PropertiesService.getScriptProperties().getProperty("time");
    return Number(time)
}

