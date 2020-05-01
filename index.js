const Discord = require("discord.js");
const client = new Discord.Client();
const ServerCommands = require("./modules/ServerCommands").commands;

const DMCommands = require("./modules/DmCommands").handle;

const token = "NzA1NzM3NjM2MTY1MzIwNzM1.XqwDcA.fNn_oAzpiV76IS_6Ja1QJX_ywTc";
const prefix = "!";

client.on("ready", () => {
    console.log("Bot ready for action!");
});

client.on('message', msg => {
    if(!msg.guild){

        // If it's a DM
        if(msg.channel.type === "dm"){
            DMCommands(prefix, msg);
        }
        return;
    }

    const args = msg.content.toLowerCase().substring(prefix.length).split(" ");
    if(ServerCommands[args[0]] !== undefined){
        ServerCommands[args[0]](msg, args);
    }
});


client.login(token);