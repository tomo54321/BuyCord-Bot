const Command = require("./Command").command;
const Discord = require("discord.js");

class BuyCommand extends Command{

    handle(){
        this.message.delete();
        
        if(this.args[1] === "dm"){
            this.handleDM();
            return;
        }

        const buyNowEmbed = new Discord.MessageEmbed()
        .setTitle("Categories on " + this.guild.name)
        .setDescription("WebStore category here blah blah!")
        .addField("Packages", "[View Available Packages](https://buycord.net/)", true)
        .setFooter("Powered by BuyCord. You are buying direct from " + this.guild.name)
        .setColor(0x005c9e);

        this.channel.send(buyNowEmbed);
    }

    handleDM(){
        const buyNowEmbed = new Discord.MessageEmbed()
        .setTitle("Support " + this.guild.name)
        .setFooter("Powered by BuyCord. You are buying direct from " + this.guild.name)
        .setURL("https://buycord.net/")
        .setColor(0x005c9e);
        for(let i = 0; i < 10; ++ i){   
            buyNowEmbed.addField("**Packages**", "Category description stuff\n[View Category](https://buycord.net/)", true)
        }
        this.sender.send(buyNowEmbed);
    }

}

exports.buyCommand = BuyCommand;