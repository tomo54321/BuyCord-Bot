const Action = require("./Action").Action;
class SendMessage extends Action{

    setChannelID(id){
        this.channelID = id;
        return this;
    }

    setMessage(message){
        this.message = message;
        return this;
    }

    send(){
        this.client.channels.fetch(this.channelID)
        .then( channel => {
            // console.log(channel.name);
            channel.send(this.message);
        })
        .catch(ex => {
            console.error(`Channel ID ${this.channelID}`);
            console.error(ex.message);
        });
    }

}


exports.SendMessage = SendMessage;