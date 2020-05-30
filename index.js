const Discord = require("discord.js");
const client = new Discord.Client();
const startWebServer = require("./Server/Webserver").startWebServer;

const BuyCommand = require("./Commands/Buy").buyCommand;

const token = "NzA1NzM3NjM2MTY1MzIwNzM1.XqwDcA.fNn_oAzpiV76IS_6Ja1QJX_ywTc";
const prefix = "!";

client.on("ready", () => {
    console.log("Bot ready for action!");
    startWebServer(client);
});

client.on('message', msg => {
    const args = msg.content.toLowerCase().substring(prefix.length).split(" ");
    let command;
    switch(args[0]){
        case "buy":
            command = new BuyCommand(msg, args);
            command.handle();
            break;
        default:
            return;
    }

    // msg.reply("Hello!");

});


client.login(token);