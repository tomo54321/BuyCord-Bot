const Discord = require("discord.js");

// Handle DM Command
exports.handle = (prefix, msg) => {
    const args = msg.content.substring(prefix.length).split(" ");
    if(commands[args[0]] !== undefined){
        commands[args[0]](msg, args);
    }
};

// Available DM Commands
const commands = {
    about : (msg, args) => {
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