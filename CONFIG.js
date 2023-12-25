function saveGameId(id) {
    PropertiesService.getScriptProperties().setProperty("gameid", id)
}

function getGameId() {
    return PropertiesService.getScriptProperties().getProperty("gameid")
}

function deleteGame() {
    PropertiesService.getScriptProperties().deleteProperty("game")
}


function saveGameState(state) {
    return PropertiesService.getScriptProperties().setProperty("state",state)//win|loss
}

function getGameState() {
    return PropertiesService.getScriptProperties().getProperty("state")//win|loss
}