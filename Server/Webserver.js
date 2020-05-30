const express = require("express");

const SendMessage = require("../Actions/SendMessage").SendMessage;

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

let DiscordClient;

exports.startWebServer = (client) => {

    DiscordClient = client;

    app.post("/", incomingPayment);

    app.listen(port, () => {
        console.log("BuyCord automated server listening on " + port);
    })


};


const incomingPayment = (request, response) => {

    // Verify the request is coming from us!
    if (request.get("X-BuyCord-Verify") === undefined
        || request.get("X-BuyCord-Verify") !== "SuperSecretKeyen") {
        response.sendStatus(404);
        return;
    }

    // 705731573760262178
    const actions = request.body.actions;
    // const signature = request.body.signature;
    actions.forEach((value, index)=>{

        switch(value.type){

            case "message":
                    let msg = new SendMessage(DiscordClient);
                    msg.setChannelID(value.channel)
                    .setMessage(value.value)
                    .send();
                break;
            default:
                console.warn(`Unknown action "${value.type}", forgot to update application?`)
                return;

        }

        // console.log(value);
    });

    response.send(JSON.stringify({
        success: true,
        message: "Sending details to Discord Server."
    }));
}