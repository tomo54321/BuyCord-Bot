class Command{

    constructor(message, msgargs){
        this.message = message;
        this.args = msgargs;
        this.sender = this.message.member;

        this.channel = message.channel;
        this.guild = message.guild;
    }

}

exports.command = Command;