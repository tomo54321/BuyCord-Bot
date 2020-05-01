const Discord = require("discord.js");

// Handle DM Command
exports.handle = (prefix, msg) => {
    const args = msg.content.toLowerCase().substring(prefix.length).split(" ");
    if(commands[args[0]] !== undefined){
        commands[args[0]](msg, args);
    }
};

// Available DM Commands
const commands = {
    /**
     * Get general information about BuyCord
     */
    about : (msg, args) => {
        const about = new Discord.MessageEmbed()
        .setTitle(`BuyCord`)
        .addField("Bot Version", "v1.0 b3f32")
        .addField("About", "BuyCord started in 2020 with the aim of giving server owners the ability to sell real items for real money, this includes roles, access to channels or private channels as well as physical items.")
        .addField("Disclaimer", "BuyCord is not resposible for any content that may have been put up or sold by server owners.")
        .addField("Support", "support@buycord.net", true)
        .addField("Social", "@BuyCord", true)
        .addField("Abuse", "abuse@buycord.net", true)
        .addField("Thank You", "https://buycord.net")
        .setFooter("(c) 2020 BuyCord. Discord is not affilated with BuyCord.")
        .setColor(0x005c9e);
        msg.reply(about);
    },
    /**
     * Give the user some commands they can run!
     */
    help : (msg, args) => {
        if(args.length === 1 || args[1].toLowerCase() === "dms"){
            const about = new Discord.MessageEmbed()
            .setTitle(`BuyCord DMs Help`)
            .addField("`!about`", "Learn more about BuyCord and get key contact information.")
            .addField("`!help`", "Get all the BuyCord Commands. Try `!help server`")
            .setFooter("(c) 2020 BuyCord. Discord is not affilated with BuyCord.")
            .setColor(0x005c9e);
            msg.reply(about);
        }else if(args[1].toLowerCase() === "server"){
            const about = new Discord.MessageEmbed()
            .setTitle(`BuyCord Server Help`)
            .addField("Info", "These commands can only be run in servers and not over a private message.")
            .addField("`!buy`", "Get a DM from the bot with available packages.")

            .addField("`!buycord` Commands", "These commands require the **Administrator** permission to run.")
            .addField("`!buycord key [key]`", "Link your Discord Server with BuyCord to begin selling.")
            .addField("`!buycord force-check`", "Checks for any outstanding purchaes to action in the server.")
            .setFooter("(c) 2020 BuyCord. Discord is not affilated with BuyCord.")
            .setColor(0x005c9e);
            msg.reply(about);
        }else{
            msg.reply("That help wasn't found, try just `!help` :thinking:")
        }

    }
};


// Stop words to exit the await message.
const stopWords = ["stop", "none", "cancel"];

// Handle the category picked. Called from the Buy command in the server.
exports.handleCategoryPicked = (collected, guild) => {

    // If reply is a stop word.
    if(stopWords.indexOf(collected.first().content.toLowerCase()) !== -1){
        collected.first().reply("Cancelled your session, thank you! :slight_smile:");
    }

    // Fake Categories Array
    const categories = {
        ["category 1"] : 2342,
        ["category 2"] : 324
    };
    // Category is in the array
    if(categories[collected.first().content.toLowerCase()] !== undefined){
        console.log(`Packages in ${collected.first().content} - ID : ${categories[collected.first().content.toLowerCase()]}`);
        // Show the packages.
        showPackages(collected.first(), guild);
    }else{
        // Category not found, user needs to run the !buy command again.
        collected.first().reply("Oh no, it looks like that category wasn't found :person_shrug:. Please return and run \`!buy\` to resume.");
    }

};

/**
 * Show the packages to the user.
 */
function showPackages(msg, guild){

    msg.reply(`Fetching packages available on ${guild.name}`);

    // Load in packages here
    const packages = new Discord.MessageEmbed()
    .setTitle(`Available packages on ${guild.name}`)
    .addField("Package 1 ( £10.00 One Time)", "Some Description Here!", true)
    .addField("Package 2 ( £10.00 Per Month)", "Some Description Here!", true)
    .addField("Package 3 ( £10.00 Per Month)", "Some Description Here!", true)
    .setFooter("Please reply with what package you would like to buy to generate a link, your session will timeout in 2 minutes if you do not reply.")
    .setColor(0x005c9e);


    // Filter message so only the user we want can reply to it.
    const filter = (m) => m.author.id === msg.author.id;

    // Send them a DM with the packages list
    msg.author.send(packages).then((ms) => {

        // Setup an await so we can get a response on the category they want to look at.
        ms.channel.awaitMessages(filter, {
            max: 1, // Only listen for 1 message
            time: 120000, // Only wait 2 minutes
            errors: ['time'] // Only timeout errors please.
        })
            .then((coll) => {handlePackagePicked(coll.first(), guild)}) // Goto the DM Commands and use the handler there.
            // If the timeout occurs, here it will be :) 
            .catch(() => ms.channel.send(`Your session has timed out, please go back to **${guild.name}** and run \`!buy\` to resume.`) );
    });
}

/**
 * Generate BuyCord Buy Link
 */
function handlePackagePicked(msg, guild){

    msg.reply("Generating link, one second please...");

    const packageLink = new Discord.MessageEmbed()
    .setTitle(`Package 1`)
    .addField("Price", "£10.00 One Time")
    .addField("About", "Some Description Here!")
    .addField("Link", "https://buycord.net/session/SAH9rihasoiH", true)
    .setFooter("Click the link to add this package to your cart.")
    .setColor(0x005c9e);
    msg.reply(packageLink);
}