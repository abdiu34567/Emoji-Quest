function gameTemplate(emoji = '🌟🍎🚗🌈🎉📚🌺') {
    return (
        `<pre>       🎲    Emoji Quest  🎲\n` +
        ` ------------------------------------\n\n\n` +
        `🕔 Time: 1 Minutes\n\n` +
        `🎮 Game: ${emoji}\n\n\n` +
        `Reply with the exact emoji sequence within 1 minute:\n\n</pre>`
    )
}


function winnerTemplate(winner = "@Me_abd", emoji = "🌟🍎🚗🌈🎉📚🌺", time) {
    return (`🏆🏆  🏆🏆  🏆🏆  🏆🏆  🏆🏆  🏆🏆\n\n\n` +
        `<b>   🏆 WINNER:   [  👤 ${winner}  ]</b>  🏆\n\n\n` +
        `<pre>🕔 Time: ${time} Seconds\n\n` +
        `🎮 Game: ${emoji}\n\n\n</pre>` +
        `Thank you, everyone, for participating in the game. 🎉\n\n`
    )
}