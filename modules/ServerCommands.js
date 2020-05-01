const Helpers = require("./helper");
const Discord = require("discord.js");


exports.commands = {

    /**
     * Main BuyCord admin command, required Admin permission to run :D 
     * @param {string} msg
     * @param {array} args
     */
    buycord: (msg, args) => {

        if (!msg.member.hasPermission("ADMINISTRATOR")) {
            msg.reply("You don't have permission.");
            Helpers.deleteMessage(msg);
            return;
        }
        if (buyCordCommands[args[1]] !== undefined) {
            buyCordCommands[args[1]](msg, args);
            Helpers.deleteMessage(msg);
        } else {
            msg.reply("Command isn't recognised.");
            Helpers.deleteMessage(msg);
        }
    },

    /**
     * The Buy Command
     * pulls up the categories and sends them to the sender.
     */
    buy: (msg, args) => {
        msg.reply(`server id is ${msg.guild.id}`);

        // Load in packages here
        const packages = new Discord.MessageEmbed()
            .setTitle(`Available categories on ${msg.guild.name}`)
            .addField("Category 1 (3 Packages)", "Some Description Here!", true)
            .addField("Category 2 (3 Packages)", "Some Description Here!", true)
            .setFooter("Please reply with what category you would like to see, your session will timeout in 2 minutes if you do not reply.")
            .setColor(0x005c9e);


        // Filter message so only the user we want can reply to it.
        const filter = (m) => m.author.id === msg.author.id;

        // Send them a DM with the packages list
        msg.member.send(packages).then((ms) => {

            // Setup an await so we can get a response on the category they want to look at.
            ms.channel.awaitMessages(filter, {
                max: 1, // Only listen for 1 message
                time: 120000, // Only wait 2 minutes
                errors: ['time'] // Only timeout errors please.
            })
                .then((coll) => {require("./DmCommands").handleCategoryPicked(coll, msg.guild)}) // Goto the DM Commands and use the handler there.
                // If the timeout occurs, here it will be :) 
                .catch(() => { ms.channel.send(`Your packages session has timed out, please go back to **${msg.guild.name}** and run \`!buy\` to resume.`) });
        });

        // Delete the message from the server channel, helps with spam!
        Helpers.deleteMessage(msg);
    },
};

const buyCordCommands = {

    /**
     * Link Discord server to Web Server.
     */
    key: (msg, args) => {
        console.log("Link server with token " + args[2]);
        msg.reply(`Server has been linked!`);
    },
    /**
     * Force check new purchases and run any commands that need to be run.
     */
    ["force-check"]: (msg, args) => {
        msg.reply("Checking");
    }
};