function DBConnection() {
  return Bot.sheetConnect("your_spreedsheet_id", "your_sheet_name");
}

function getEmojis() {
  DBConnection();
  const row = getRandomNumber();
  const emoji = Bot.SheetDB.getValue(row, 1);
  return emoji;
}

function saveNextEmoji(next) {
  PropertiesService.getScriptProperties().setProperty("next", next);
}

function getNextEmoji() {
  const old = PropertiesService.getScriptProperties().getProperty("next");
  return Number(old);
}

function getRandomNumber() {
  // Generate a random number between 2 and 201
  const randomNumber = Math.floor(Math.random() * (200 - 2 + 1)) + 2;
  return randomNumber;
}
